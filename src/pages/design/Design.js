// import { useState } from "react";
// import Canva from "./Canva";
// import Sidebar from "./Sidebar";
// import Header from "../Header";
// import SettingsPanel from "./SettingsPanel";


// export default function DesignPage() {
//   const [selectedTool, setSelectedTool] = useState("products");
//   const [mockupImage, setMockupImage] = useState(
//     "/mockups/hat-front.png" // path to your product mockup
//   );

//   return (
//     <>
//           <Header />

//     <div className="flex h-screen w-full bg-gray-50">

//       {/* LEFT SIDEBAR */}
//       <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

//       {/* CANVAS */}
//       <div className="flex flex-col flex-1 p-4">
//         <Canva
//           tool={selectedTool} 
//           mockupImage={mockupImage}
//         />
//                {/* RIGHT SETTINGS PANEL */}
//         <SettingsPanel
//           selectedTool={selectedTool}
//         />

//         {/* Bottom Bar */}
//         <div className="flex justify-between px-6 py-4 border-t bg-white">
//           <button className="px-6 py-3 rounded-xl bg-gray-200 font-semibold">
//             GET PRICE
//           </button>
//           <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold">
//             SAVE DESIGN
//           </button>
//           <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold">
//             NEXT STEP →
//           </button>
//         </div>
//       </div>
//     </div>
//         </>
//   );
// }
import { useState } from "react";
import Canva from "./Canva";
import Sidebar from "./Sidebar";
import Header from "../Header";
import SettingsPanel from "./SettingsPanel";

import { useLocation } from "react-router-dom";

// export default function DesignPage() {
//   const location = useLocation();

//   // Image passed from Single Product Page
//   const passedMockup = location.state?.mockup;

//   const [mockupImage, setMockupImage] = useState(
//     passedMockup || "/mockups/hat-front.png" 
//   );
// console.log("🎯 Passed mockup from Single:", passedMockup);
// console.log("🎨 Using mockupImage:", mockupImage);

//   const [selectedTool, setSelectedTool] = useState("products");

//   return (
// <>
//       <Header />

//       {/* Main layout */}
//       <div className="flex h-screen w-full bg-gray-50">
//         {/* Sidebar */}
//         <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

//         {/* Canvas + Settings */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Canvas area */}
//           <div className="flex-1 p-4 flex justify-center items-center relative">
//             <Canva selectedTool={selectedTool} mockupImage={mockupImage} />
//           </div>.  

//           {/* Settings panel - only show if a tool is selected */}
//           {selectedTool && (
//             <SettingsPanel selectedTool={selectedTool} />
//           )}
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="flex justify-between px-6 py-4 border-t bg-white">
//         <button className="px-6 py-3 rounded-xl bg-gray-200 font-semibold">
//           GET PRICE
//         </button>
//         <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold">
//           SAVE DESIGN
//         </button>
//         <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold">
//           NEXT STEP →
//         </button>
//       </div>
//     </>
//   );
// }
// export default function DesignPage() {
//   const location = useLocation();
//   const passedMockup = location.state?.mockup;

//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [mockupImage] = useState(passedMockup || "/mockups/hat-front.png");

//   const [selectedTool, setSelectedTool] = useState("products");

//   // ✅ NEW TEXT STATE
//   const [texts, setTexts] = useState([]);
//   const [activeTextId, setActiveTextId] = useState(null);

//   return (
//     <>
//       <Header />

//       <div className="flex h-screen w-full bg-gray-50">
//         <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

//         <div className="flex flex-1 overflow-hidden">
//           <div className="flex-1 p-4 flex justify-center items-center">
//             <Canva
//               mockupImage={mockupImage}
//               uploadedImage={uploadedImage}
//               texts={texts}
//               setTexts={setTexts}
//               activeTextId={activeTextId}
//               setActiveTextId={setActiveTextId}
//             />
//           </div>

//           {selectedTool && (
//             <SettingsPanel
//               selectedTool={selectedTool}
//               texts={texts}
//               setTexts={setTexts}
//               activeTextId={activeTextId}
//               setActiveTextId={setActiveTextId}
//               setUploadedImage={setUploadedImage}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

export default function DesignPage() {
  const location = useLocation();
  const passedMockup = location.state?.mockup;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [mockupImage] = useState(passedMockup || "/mockups/hat-front.png");
  const [selectedTool, setSelectedTool] = useState("products");
  const [texts, setTexts] = useState([]);
  const [activeTextId, setActiveTextId] = useState(null);

  return (
    <>
      <Header />

      <div className="flex flex-col h-screen w-full bg-gray-50">
        {/* MAIN AREA */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

          <div className="flex flex-1 overflow-hidden">
            {/* Canvas */}
            <div className="flex-1 p-4 flex justify-center items-center">
              <Canva
                mockupImage={mockupImage}
                uploadedImage={uploadedImage}
                texts={texts}
                setTexts={setTexts}
                activeTextId={activeTextId}
                setActiveTextId={setActiveTextId}
              />
            </div>

            {/* Settings Panel */}
            {selectedTool && (
              <SettingsPanel
                selectedTool={selectedTool}
                texts={texts}
                setTexts={setTexts}
                activeTextId={activeTextId}
                setActiveTextId={setActiveTextId}
                setUploadedImage={setUploadedImage}
              />
            )}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex justify-between px-6 py-4 border-t bg-white">
          <button className="px-6 py-3 rounded-xl bg-gray-200 font-semibold">
            GET PRICE
          </button>
          <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold">
            SAVE DESIGN
          </button>
          <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold">
            NEXT STEP →
          </button>
        </div>
      </div>
    </>
  );
}
