import {
  Gift,
  MessageCircleQuestionMark,
  SendToBack,
  Speech,
} from "lucide-react";
import React from "react";

const EventFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Experienced Speaker",
      description:
        "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
      icon: <Speech size={40} />,
    },
    {
      id: 2,
      title: "Live Workshop Program",
      description:
        "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
      icon: <SendToBack size={40} />,
    },
    {
      id: 3,
      title: "Exciting Q&A Sessions",
      description:
        "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
      icon: <MessageCircleQuestionMark size={40} />,
    },
    {
      id: 4,
      title: "Exiting Giveaways Program",
      description:
        "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
      icon: <Gift size={40} />,
    },
  ];

  return (
    <div className="py-16 pt-28">
      <div className="container mx-auto lg:max-w-[1170px]">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex w-full justify-center overflow-hidden text-white"
            >
              <div className="flex max-w-xs flex-col items-center p-6 md:items-start">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-center text-sm leading-relaxed md:text-start">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFeatures;
