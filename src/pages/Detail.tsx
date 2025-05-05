/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import useCardPosition from "@/hooks/useCardPosition";
import { motion } from "motion/react"; // Make sure to import from 'framer-motion'
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router"; // Use react-router-dom

const Detail = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { data, setBackwardId } = useCardPosition();
  const [containerOffset, setContainerOffset] = useState({
    x: 0,
    y: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useLayoutEffect(() => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      setContainerOffset({ x: left, y: top });
    }

    return () => {
      setBackwardId(id!);
    };
  }, [setBackwardId, id]);

  return (
    <div>
      <figure ref={containerRef} className='w-full h-[60vh] top-0'>
        {containerRef.current && (
          <motion.img
            src='/wallpaper.jpg'
            alt='title'
            initial={{
              x: Number(data?.x) - containerOffset.x,
              y: Number(data?.y) - containerOffset.y,
              width: data?.w,
              height: data?.h,
            }}
            animate={{
              x: 0,
              y: 0,
              width: "100%",
              height: "60vh",
            }}
            exit={{
              x: Number(data?.x) - containerOffset.x,
              y: Number(data?.y) - containerOffset.y,
              width: data?.w,
              height: data?.h,
              transition: {
                duration: 0.4,
                delay: 0.2,
              },
            }}
            transition={{
              duration: 0.3,
            }}
            className='w-full h-full object-cover shadow-lg rounded-md'
          />
        )}
      </figure>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.2,
            delay: 0,
          },
        }}
        transition={{ delay: 0.4 }} // Delay content animation
        className='space-y-2 mt-5 p-4'
      >
        <h1 className='text-3xl font-bold'>Title {id}</h1>
        <p className='text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
        <Button onClick={() => navigate(-1)} className='mt-4'>
          Back
        </Button>
      </motion.div>
    </div>
  );
};

export default Detail;
