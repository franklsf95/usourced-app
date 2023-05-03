import { PictureAsPdf } from "@mui/icons-material";
import { Button, Card, CardContent, Typography } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AI_AGENT,
  CURRENT_USER,
  ChatMessage,
  ChatStateAtom,
} from "../ChatProvider.js";

type Scene = {
  messages: ChatMessage[];
  productName: string;
  productMockupState: string;
  summary: JSX.Element[];
};

type SceneDelta = {
  message: ChatMessage;
  productName?: string;
  productMockupState?: string;
  summary?: JSX.Element[];
};

function newMessage(
  text: string,
  is_ai: boolean,
  payload?: JSX.Element,
): ChatMessage {
  return {
    id: Math.random().toString(),
    text,
    createdAt: moment().toDate(),
    from: is_ai ? AI_AGENT : CURRENT_USER,
    payload,
  };
}

function newImagePayload(url: string): JSX.Element {
  return <img src={url} height={150} />;
}

function ButtonsPayload({
  buttons,
}: {
  buttons: { title: string; disabled?: boolean }[];
}): JSX.Element {
  const { advanceSceneWithSimulatedAIResponse } = useScene();
  return (
    <>
      {buttons.map((button) => (
        <Button
          key={button.title}
          variant="outlined"
          size="small"
          onClick={advanceSceneWithSimulatedAIResponse}
          sx={{ mt: 1, mr: 1, fontSize: 13, letterSpacing: 0 }}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
}

function newSummaryItem(label: string, value: string): JSX.Element {
  return (
    <Typography variant="body1" key={label}>
      <b>{label}: </b>
      {value}
    </Typography>
  );
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
  },
  {
    message: newMessage("1000", false),
    summary: [newSummaryItem("Quantity", "1000")],
  },
  {
    message: newMessage(
      "That's no problem! Do you have any sketches or drawings for how you would like the plushie to look like? You can drag it onto this chat.",
      true,
    ),
  },
  {
    message: newMessage(
      "Here is a sketch:",
      false,
      newImagePayload("/demo/plushie-drawing.png"),
    ),
    productMockupState: "/demo/plushie-drawing.png",
  },
  {
    message: newMessage(
      "Cute kitty! What is your preferred material for the plushie?",
      true,
      <ButtonsPayload
        buttons={[
          { title: "1. Long fur" },
          { title: "2. Short fur", disabled: true },
          { title: "3. No fur (more like a velvet texture)", disabled: true },
        ]}
      />,
    ),
    productName: "Bird Plushie",
  },
  {
    message: newMessage("1. Long fur", false),
  },
  {
    message: newMessage(
      "How would you like it to be stuffed?",
      true,
      <ButtonsPayload
        buttons={[
          { title: "1. Squishy", disabled: true },
          { title: "2. Normal PP cotton" },
          { title: "3. Beans", disabled: true },
        ]}
      />,
    ),
    productName: "Bird Plushie",
    summary: [newSummaryItem("Material", "Long fur")],
  },
  {
    message: newMessage("2. Normal PP cotton", false),
  },
  {
    message: newMessage(
      "Perfect. What do you think of something like this?",
      true,
      newImagePayload("/demo/plushie-mockup-1.png"),
    ),
    productName: "Fluffy White Cat Plushie",
    productMockupState: "/demo/plushie-mockup-1.png",
    summary: [newSummaryItem("Stuffing", "Normal PP cotton")],
  },
  {
    message: newMessage(
      "That's pretty good! Maybe we make the body a bit wider and nose a bit flatter?",
      false,
    ),
  },
  {
    message: newMessage(
      "Sure thing! How about this?",
      true,
      newImagePayload("/demo/plushie-mockup-2.png"),
    ),
    productMockupState: "/demo/plushie-mockup-2.png",
  },
  {
    message: newMessage("Ok perfect. Can you show me the side too?", false),
  },
  {
    message: newMessage(
      "Of course!",
      true,
      newImagePayload("/demo/plushie-mockup-3.png"),
    ),
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
      "Sampling will take a week and production another 2 weeks. Here is the pricing breakdown. You can also express ship only a portion and standard ship the remainder to get the first batch in quickly but save on overall cost. What would you like to do?",
      true,
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            <b>Sampling Time:</b> 7 days
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Production Time:</b> 15 days
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Sampling Cost:</b> $100
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Unit price with standard 30-day shipping:</b> $7.70
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Unit price with express 7-day shipping:</b> $11.27
          </Typography>
        </CardContent>
      </Card>,
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
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Timeline Estimates
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Sample placement date:</b>{" "}
            {moment().add(1, "day").toDate().toLocaleDateString()}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Sample ready date:</b>{" "}
            {moment().add(7, "day").toDate().toLocaleDateString()}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Bulk production placement date:</b>{" "}
            {moment().add(8, "day").toDate().toLocaleDateString()}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Bulk production ready date:</b>{" "}
            {moment().add(15, "day").toDate().toLocaleDateString()}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Express shipment receiving date (100 units):</b>{" "}
            {moment().add(21, "day").toDate().toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            <b>Standard shipment receiving date (900 units):</b>{" "}
            {moment().add(35, "day").toDate().toLocaleDateString()}
          </Typography>
          <Typography variant="h3" gutterBottom mt={2}>
            Total Order Cost
          </Typography>
          <Typography variant="body2">
            <b>Sample + Production + Shipping:</b> $8157
          </Typography>
          <Button size="small" variant="outlined" sx={{ mt: 2, mb: -1 }}>
            Place Order
          </Button>
        </CardContent>
      </Card>,
    ),
    summary: [
      <>
        <Typography variant="h3" mt={2} gutterBottom>
          Timeline Estimates
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Sample placement date:</b>{" "}
          {moment().add(1, "day").toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Sample ready date:</b>{" "}
          {moment().add(7, "day").toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Bulk production placement date:</b>{" "}
          {moment().add(8, "day").toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Bulk production ready date:</b>{" "}
          {moment().add(15, "day").toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Express shipment receiving date (100 units):</b>{" "}
          {moment().add(21, "day").toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          <b>Standard shipment receiving date (900 units):</b>{" "}
          {moment().add(35, "day").toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="h3" gutterBottom mt={2}>
          Total Order Cost
        </Typography>
        <Typography variant="body2">
          <b>Sample + Production + Shipping:</b> $8157
        </Typography>
        <Button size="small" variant="contained" sx={{ mt: 2, mb: -1 }}>
          Place Order
        </Button>
      </>,
    ],
  },
  {
    message: newMessage("Place Order", false),
  },
  {
    message: newMessage(
      "Thank you for your order! We will be in touch once your sample is ready. Here is a summary of your product sourcing request for your reference.",
      true,
      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 1 }}
        endIcon={<PictureAsPdf />}
      >
        Save Order Summary
      </Button>,
    ),
  },
];

function getScenesFromDeltas(sceneDeltas: SceneDelta[]): Scene[] {
  const scenes: Scene[] = [];
  let scene: Scene = {
    messages: [],
    productName: "",
    productMockupState: "",
    summary: [],
  };
  for (const delta of sceneDeltas) {
    scene = {
      ...scene,
      messages: [...scene.messages, delta.message],
      productName: delta.productName || scene.productName,
      productMockupState: delta.productMockupState || scene.productMockupState,
      summary: [...scene.summary, ...(delta.summary ?? [])],
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
      }, Math.random() * 0);
    }
  };
  return {
    sceneNumber,
    scene,
    incrementSceneNumber,
    advanceSceneWithSimulatedAIResponse,
  };
}
