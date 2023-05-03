import moment from "moment";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AI_AGENT,
  CURRENT_USER,
  ChatMessage,
  ChatStateAtom,
} from "./ChatProvider.js";

type PricingEstimatorState = {
  quantity: number | null;
  minQuantity: number;
};

type Scene = {
  messages: ChatMessage[];
  productName: string;
  productMockupState: string;
  pricingState: PricingEstimatorState;
  timelineState: string;
  colorState: string;
};

type SceneDelta = {
  message: ChatMessage;
  productName?: string;
  productMockupState?: string;
  pricingState?: PricingEstimatorState;
  timelineState?: string;
  colorState?: string;
};

function newMessage(
  text: string,
  is_ai: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: { [key: string]: any },
): ChatMessage {
  return {
    id: Math.random().toString(),
    text,
    createdAt: moment().toDate(),
    from: is_ai ? AI_AGENT : CURRENT_USER,
    payload,
  };
}

const sceneDeltas = [
  {
    message: newMessage(
      "Welcome to USourced! What would you like to create today?",
      true,
    ),
    productName: "Your New Product",
  },
  {
    message: newMessage("I'm looking to create a custom plushie", false),
  },
  {
    message: newMessage(
      "Fabulous -- how many units are you looking to order? Our plushie MOQ starts at 200 units.",
      true,
    ),
    pricingState: {
      quantity: null,
      minQuantity: 200,
    },
  },
  {
    message: newMessage("1000", false),
    pricingState: {
      quantity: 1000,
      minQuantity: 200,
    },
  },
  {
    message: newMessage(
      "That's no problem! Do you have any sketches or drawings for how you would like the plushie to look like? You can drag it onto this chat.",
      true,
    ),
  },
  {
    message: newMessage("Here is a sketch:", false, {
      attachments: [
        {
          type: "image",
          url: "/demo/plushie-drawing.png",
        },
      ],
    }),
    productMockupState: "/demo/plushie-drawing.png",
  },
  {
    message: newMessage(
      "Cute kitty! What is your preferred material for the plushie?",
      true,
      {
        buttons: [
          "1. Long fur",
          "2. Short fur",
          "3. No fur (more like a velvet texture)",
        ],
      },
    ),
    productName: "Bird Plushie",
  },
  { message: newMessage("3. No fur (more like a velvet texture)", false) },
  {
    message: newMessage(
      "Perfect. What do you think of something like this?",
      true,
      {
        attachments: [
          {
            type: "image",
            url: "/demo/plushie-mockup-1.png",
          },
        ],
      },
    ),
    productName: "Fluffy White Cat Pushie",
    productMockupState: "/demo/plushie-mockup-1.png",
  },
  {
    message: newMessage(
      "That's pretty good! Maybe we make the body a bit wider and nose a bit flatter?",
      false,
    ),
  },
  {
    message: newMessage("Sure thing! How about this?", true, {
      attachments: [
        {
          type: "image",
          url: "/demo/plushie-mockup-2.png",
        },
      ],
    }),
    productMockupState: "/demo/plushie-mockup-2.png",
  },
  {
    message: newMessage("Ok perfect. Can you show me the side too?", false),
  },
  {
    message: newMessage("Of course!", true, {
      attachments: [
        {
          type: "image",
          url: "/demo/plushie-mockup-3.png",
        },
      ],
    }),
    productMockupState: "/demo/plushie-mockup-3.png",
  },
  {
    message: newMessage(
      "Amazing! How much would it be to order 1000 units and when can I get it by?",
      false,
    ),
  },
  {
    message: newMessage(
      "Sampling will take a week and production another 2 weeks. Here is the pricing breakdown:",
      true,
      {
        attachments: [
          {
            type: "image",
            url: "/demo/plushie-mockup-3.png",
          },
        ],
      },
    ),
  },
  {
    message: newMessage(
      "I will take the express shipping for the first 100 units and standard shipping for the rest.",
      false,
    ),
  },
  {
    message: newMessage(
      "Okay, no problem! Here is the final pricing breakdown, with timeline and cost estimates. When you are ready, you can place the order by clicking the button below.",
      true,
      {
        attachments: [
          {
            type: "image",
            url: "/demo/plushie-mockup-3.png",
          },
        ],
      },
    ),
  },
  {
    message: newMessage("Place Order", false),
  },
  {
    message: newMessage(
      "Thank you for your order! We will be in touch once your sample is ready. Here is a summary of your product sourcing request for your reference.",
      true,
    ),
  },
];

function getScenesFromDeltas(sceneDeltas: SceneDelta[]): Scene[] {
  const scenes: Scene[] = [];
  let scene: Scene = {
    messages: [],
    productName: "",
    productMockupState: "",
    pricingState: {
      quantity: null,
      minQuantity: 0,
    },
    timelineState: "",
    colorState: "",
  };
  for (const delta of sceneDeltas) {
    scene = {
      ...scene,
      messages: [...scene.messages, delta.message],
      productName: delta.productName || scene.productName,
      productMockupState: delta.productMockupState || scene.productMockupState,
      pricingState: delta.pricingState || scene.pricingState,
      timelineState: delta.timelineState || scene.timelineState,
      colorState: delta.colorState || scene.colorState,
    };
    scenes.push(scene);
  }
  return scenes;
}

const scenes = getScenesFromDeltas(sceneDeltas);

export const SceneNumberAtom = atom<number>({
  key: "SceneNumberAtom",
  default: 0,
});

export function useScene() {
  const sceneNumber = useRecoilValue(SceneNumberAtom);
  const setSceneNumber = useSetRecoilState(SceneNumberAtom);
  const setChatState = useSetRecoilState(ChatStateAtom);

  useEffect(() => {
    const newScene = scenes[sceneNumber % scenes.length];
    setChatState({
      messages: newScene.messages,
      incomingMessage: null,
    });
  }, [sceneNumber, setChatState]);

  const scene = scenes[sceneNumber % scenes.length];
  const incrementSceneNumber = (delta: number) => {
    setSceneNumber((prev) => {
      let newValue = prev + delta;
      if (newValue < 0 || newValue >= scenes.length) {
        newValue = 0;
      }
      return newValue;
    });
  };
  const advanceSceneWithSimulatedAIResponse = () => {
    incrementSceneNumber(1);
    if (sceneNumber % 2 === 0) {
      // Automatically advance to next scene to simulate AI response
      setTimeout(() => {
        incrementSceneNumber(1);
      }, Math.random() * 2000);
    }
  };
  return {
    sceneNumber,
    scene,
    incrementSceneNumber,
    advanceSceneWithSimulatedAIResponse,
  };
}
