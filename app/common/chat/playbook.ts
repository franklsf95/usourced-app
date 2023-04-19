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
  quantity: number;
  quantityChoices: number[];
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
      "Welcome to USourced! What is your product sourcing request?",
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
      quantity: 0,
      quantityChoices: [200, 500, 1000],
    },
  },
  {
    message: newMessage("1000", false),
    pricingState: {
      quantity: 1000,
      quantityChoices: [200, 500, 1000],
    },
  },
  {
    message: newMessage(
      "That's no problem! Do you have any sketches or drawings for how you would like the plushie to look like? You can drag it onto this chat.",
      true,
    ),
  },
  {
    message: newMessage("", false, {
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
      "Cute bird! What is your preferred material for the plushie?",
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
    productName: "Gray Velvet Bird Plushie",
    productMockupState: "/demo/plushie-mockup-1.png",
  },
  {
    message: newMessage(
      "That's pretty good! Maybe we make the body a bit fatter and eyes a bit bigger? The feet can be a bit fatter too.",
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
    message: newMessage(
      "Yes! Maybe the beak a bit smaller and wings a bit bigger?",
      false,
    ),
  },
  {
    message: newMessage("How about this one?", true, {
      attachments: [
        {
          type: "image",
          url: "/demo/plushie-mockup-3.png",
        },
      ],
    }),
    productMockupState: "/demo/plushie-mockup-3.png",
  },
];

function getScenesFromDeltas(sceneDeltas: SceneDelta[]): Scene[] {
  const scenes: Scene[] = [];
  let scene: Scene = {
    messages: [],
    productName: "",
    productMockupState: "",
    pricingState: {
      quantity: 0,
      quantityChoices: [],
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
      console.log("incrementSceneNumber", delta, newValue);
      return newValue;
    });
  };
  return { sceneNumber, scene, incrementSceneNumber };
}
