


// import React, { useState, useEffect } from "react";
// import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from "react-konva";

// export default function Canva({ mockupImage, textConfig, setTextConfig }) {
//   const [background, setBackground] = useState(null);
//   const [texts, setTexts] = useState([]);
//   const [size, setSize] = useState({ width: 600, height: 600 });

//   useEffect(() => {
//     if (!mockupImage) return;

//     const img = new window.Image();
//     img.crossOrigin = "anonymous";
//     img.src = `${mockupImage}?t=${Date.now()}`;

//     img.onload = () => {
//       setBackground(img);
//       setSize({ width: img.width, height: img.height });
//     };
//   }, [mockupImage]);

//   const addText = () => {
//     setTexts((prev) => [
//       ...prev,
//       { id: Date.now(), x: 150, y: 150, text: "New Text", fontSize: 30 }
//     ]);
//   };

//   return (
//     <div className="relative" style={{ width: size.width, height: size.height }}>
//       {/* BUTTONS ABOVE CANVAS */}
//       {/* <div className="absolute top-2 left-2 z-20">
//         <button
//           onClick={addText}
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow"
//         >
//           Add Text
//         </button>
//       </div> */}

//       {/* CANVAS BEHIND EVERYTHING */}
//       <div className="absolute inset-0 z-0 top-2 left-2 z-20">
//         <Stage width={size.width} height={size.height}>
//            <Layer>
//         {background && (
//           <KonvaImage
//             image={background}
//             width={size.width}
//             height={size.height}
//           />
//         )}

//         {/* ✅ TEXT NOW COMES FROM RIGHT PANEL */}
//         {textConfig.text && (
//           <KonvaText
//             text={textConfig.text}
//             x={textConfig.x}
//             y={textConfig.y}
//             fontSize={textConfig.fontSize}
//             fill={textConfig.color}
//             draggable
//             onDragEnd={(e) =>
//               setTextConfig({
//                 ...textConfig,
//                 x: e.target.x(),
//                 y: e.target.y()
//               })
//             }
//           />
//         )}
//       </Layer>
//         </Stage>
//       </div>
//     </div>
//   );
// }
    
// import React, { useEffect, useState } from "react";
// import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from "react-konva";

// const CANVAS_SIZE = 500; // 🔥 MAKE MOCKUP BIGGER HERE
// export default function Canva({
//   mockupImage,
//   uploadedImage,
//   textConfig,
//   setTextConfig
// }) {

//   const [background, setBackground] = useState(null);
//   const [imageProps, setImageProps] = useState({
//     width: 0,
//     height: 0,
//     x: 0,
//     y: 0
//   });

//   useEffect(() => {
//     if (!mockupImage) return;

//     const img = new window.Image();
//     img.crossOrigin = "anonymous";
//     img.src = `${mockupImage}?t=${Date.now()}`;

//     img.onload = () => {
//       // 🔥 SCALE IMAGE TO FIT CANVAS
//       const scale = Math.min(
//         CANVAS_SIZE / img.width,
//         CANVAS_SIZE / img.height
//       );

//       const scaledWidth = img.width * scale;
//       const scaledHeight = img.height * scale;

//       setBackground(img);
//       setImageProps({
//         width: scaledWidth,
//         height: scaledHeight,
//         x: (CANVAS_SIZE - scaledWidth) / 2,
//         y: (CANVAS_SIZE - scaledHeight) / 2
//       });
//     };
//   }, [mockupImage]);
// const [userImage, setUserImage] = useState(null);

// useEffect(() => {
//   if (!uploadedImage) return;

//   const img = new window.Image();
//   img.src = uploadedImage;

//   img.onload = () => {
//     setUserImage(img);
//   };
// }, [uploadedImage]);

//   return (
//     <div className="border shadow-lg bg-white">
//       <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
//       <Layer>
//   {/* PRODUCT MOCKUP */}
//   {background && (
//     <KonvaImage image={background} {...imageProps} />
//   )}

//   {/* UPLOADED IMAGE */}
//   {userImage && (
//     <KonvaImage
//       image={userImage}
//       x={CANVAS_SIZE / 2 - 75}
//       y={CANVAS_SIZE / 2 - 75}
//       width={150}
//       height={150}
//       draggable
//     />
//   )}

//   {/* TEXT */}
//   {/* {textConfig.text && (
//     <KonvaText
//       text={textConfig.text}
//       x={textConfig.x}
//       y={textConfig.y}
//       fontSize={textConfig.fontSize}
//       fill={textConfig.color}
//       draggable
//       onDragEnd={(e) =>
//         setTextConfig({
//           ...textConfig,
//           x: e.target.x(),
//           y: e.target.y()
//         })
//       }
//     />
//   )} */}

//   {/* TEXTS */}
// {texts.map((t) => (
//   <KonvaText
//     key={t.id}
//     text={t.text}
//     x={t.x}
//     y={t.y}
//     fontSize={t.fontSize}
//     fill={t.color}
//     draggable
//     onClick={() => setActiveTextId(t.id)}
//     onTap={() => setActiveTextId(t.id)}
//     onDragEnd={(e) => {
//       setTexts((prev) =>
//         prev.map((item) =>
//           item.id === t.id
//             ? { ...item, x: e.target.x(), y: e.target.y() }
//             : item
//         )
//       );
//     }}
//   />
// ))}

// </Layer>
               
//       </Stage>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from "react-konva";

const CANVAS_SIZE = 500;

export default function Canva({
  mockupImage,
  uploadedImage,
  texts,
  setTexts,
  activeTextId,
  setActiveTextId
}) {
  const [background, setBackground] = useState(null);
  const [imageProps, setImageProps] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  const [userImage, setUserImage] = useState(null);

  /* LOAD MOCKUP */
  useEffect(() => {
    if (!mockupImage) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = `${mockupImage}?t=${Date.now()}`;

    img.onload = () => {
      const scale = Math.min(
        CANVAS_SIZE / img.width,
        CANVAS_SIZE / img.height
      );

      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      setBackground(img);
      setImageProps({
        width: scaledWidth,
        height: scaledHeight,
        x: (CANVAS_SIZE - scaledWidth) / 2,
        y: (CANVAS_SIZE - scaledHeight) / 2
      });
    };
  }, [mockupImage]);

  /* LOAD UPLOADED IMAGE */
  useEffect(() => {
    if (!uploadedImage) return;

    const img = new window.Image();
    img.src = uploadedImage;

    img.onload = () => {
      setUserImage(img);
    };
  }, [uploadedImage]);

  return (
    <div className="border shadow-lg bg-white">
      <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
        <Layer>
          {/* PRODUCT MOCKUP */}
          {background && (
            <KonvaImage image={background} {...imageProps} />
          )}

          {/* UPLOADED LOGO / IMAGE */}
          {userImage && (
            <KonvaImage
              image={userImage}
              x={CANVAS_SIZE / 2 - 75}
              y={CANVAS_SIZE / 2 - 75}
              width={150}
              height={150}
              draggable
            />
          )}

          {/* TEXT LAYERS */}
          {texts.map((t) => (
            <KonvaText
              key={t.id}
              text={t.text}
              x={t.x}
              y={t.y}
              fontSize={t.fontSize}
              fill={t.color}
              draggable
              onClick={() => setActiveTextId(t.id)}
              onTap={() => setActiveTextId(t.id)}
              onDragEnd={(e) => {
                setTexts((prev) =>
                  prev.map((item) =>
                    item.id === t.id
                      ? {
                          ...item,
                          x: e.target.x(),
                          y: e.target.y()
                        }
                      : item
                  )
                );
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
