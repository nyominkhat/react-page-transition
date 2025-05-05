import { Card, CardContent } from "@/components/ui/card";
import useCardPosition from "@/hooks/useCardPosition";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

type CardRefs = Record<string, HTMLElement | null>;

export const List = () => {
  const [clickCardId, setClickCardId] = useState<number>();
  const { setPosition, backwardId } = useCardPosition();

  const navigate = useNavigate();
  const cardRef = useRef<CardRefs>({});

  return (
    <motion.div className='grid grid-cols-3 gap-4'>
      {list.map((item) => (
        <motion.div
          key={item.id}
          initial={
            item.id !== Number(backwardId) && {
              opacity: 0.5,
            }
          }
          animate={{
            opacity: 1,
            transition: {
              duration: 0.2,
            },
          }}
          exit={
            item.id !== Number(clickCardId)
              ? {
                  opacity: 0.5,
                  transition: {
                    duration: 0.07,
                  },
                }
              : {}
          }
        >
          <Card>
            <CardContent className='space-y-2 overflow-hidden'>
              <motion.figure
                className='w-full border overflow-hidden max-h-2/3 rounded-sm'
                // layout
              >
                <motion.img
                  src={item.image}
                  className='object-cover w-full h-full'
                  // layoutId={`card-image-${item.id}`}
                  ref={(el) => {
                    cardRef.current[item.id] = el;
                  }}
                />
              </motion.figure>

              <p
                className='underline text-neutral-800 mt-4 inline-block'
                onClick={() => {
                  const cardEl = cardRef.current[item.id];
                  if (cardEl) {
                    const rect = cardEl.getBoundingClientRect();
                    setPosition({
                      w: rect.width,
                      h: rect.height,
                      x: rect.left + window.scrollX,
                      y: rect.top + window.scrollY,
                    });
                    navigate(`/detail/${item.id}`);
                    setClickCardId(item.id);
                  }
                }}
              >
                {item.title}
              </p>

              <p className='text-sm text-neutral-600'>{item.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

const list = Array.from({ length: 6 }, (_, index) => ({
  title: `Title ${index + 1}`,
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, voluptates repellat! Error, recusandae? Sapiente vero ad dolorem, nisi, officia, sequi eligendi incidunt eaque ratione fugiat debitis. Ex voluptatibus cum dolores!",
  image: "/wallpaper.jpg",
  id: index + 1,
}));
