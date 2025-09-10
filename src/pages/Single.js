import React, {useState, useEffect} from "react";
import white from "./home.png";
import young from "./a1.jpeg";
import old from "./a3.jpg";
import Navbar from "../components/Navbar";
import step from "./newsprint.png";
import oil from "./safe.png";
import hiab from "./ran.png";
import "./home.css";
import "./style.css";
import Footer from "./Footer";
import Banner from "./Banner";
import Header from "./Header";
import axios from "axios"
import { useParams, useNavigate, Link } from "react-router-dom";


const bgImage = `url("data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'>
    <image href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAACRUlEQVR4nLVTPWtVQRBNTCCKBhSTJiKJip8oVoqK+CoxTYyFMYUhj3ff3TMzuzu79yYxJKg8TSM2goqFIGKdxkIQrGwVwUZQK0Xx619E9uELL0UiERw4zNwtDuecO9PRsXZ1/kH73P62rupsNBobEpaWlpbn9rd1kZVluQlAn3Nue5ZlvdVq3ApM9dVq2p+6tXbL4uJi11rEy3bGxsa6nHMDIlohCmdhw2nmeA5SjEDiBXZFNXWReDARrxZBy063qvaIyE6yOko2GrLBMxfXwWGOJC6ILZ6zLV6yjbdhp89k2ZXeFaTJXpa5gTz3u4jCXua434gcg/hxSGBDOmOM3jCk8+B4BxJek8Sf1pXvrS/vEZXHq9XqxiZpUpXsGePOA45zCnUgTORwCvZzOXQqwRg/a4zOG+gjw+ENcfjEUny3rnxLtiiToGaeiZCo3EGkF5MCI8UM4AMQGs1v8mRMQvCAnwPpE1B8Zzh8A8cvZONX4uIx4I60bHemYPPc7TNGTuWko8aEMoe/1lRH3uTk60TBJuugcBccXoHDj0QI1l+Q+IxZTyRxzQzTMDysPWk9auSPgjVPdkG6YEivQgLA6gz5WZDeAocXkPCRJHyAhM9ki6dAPJm2Y8XapGBrIruN0QqgIzn5yaSuDj+ek14i0stEvg4ON3PWBxC9TxIeGtF5wB9YVtiqSqXSneyLyLaaan8KmoiG0t/PrB20mR0kikMpnhrpoYSM+fAksGdiYnrzX6+ldWbJSvvZ/estryBv66vh/9RvTxMh3UHKN/wAAAAASUVORK5CYII='/>
  </svg>")`;
const Single = () => {

    const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
 const [product, setProduct] = useState(null);
  const [grandParents, setGrandParents] = useState([]);
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedGrandParent, setSelectedGrandParent] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
 

useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data: product } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/product/${id}`
        );

        setProduct(product);

        // Category info
        const category = product.category;
        if (category) {
          setSelectedChild(category._id);
          if (category.parent) {
            setSelectedParent(category.parent._id);
            if (category.parent.parent) {
              setSelectedGrandParent(category.parent.parent._id);
            }
          }
        }

        // Debugging
        console.log("Fetched product:", product);
        console.log("Child:", category?.name);
        console.log("Parent:", category?.parent?.name);
        console.log("Grandparent:", category?.parent?.parent?.name);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);
const [selectedColor, setSelectedColor] = useState(null);

useEffect(() => {
  if (product?.color?.length > 0) {
    // pick the first color from DB as default
    setSelectedColor(product.color[0]);
  }
}, [product]);

const availableColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
  { name: "Gray", hex: "#808080" },
  { name: "Navy", hex: "#001F54" },
  { name: "Orange", hex: "#FFA500" },
];
  return (
    <>
  <div id="__next"><div className="__variable_0fe379 __variable_70c4e6 font-sans">
  <Header />
    </div>
    </div>




    
    
    <main>
        
        <div class="relative bg-white"><div class="text-slate-900 bg-inherit"><div class="mx-auto max-w-[1440px] px-6">
  <nav className="pt-4" aria-label="Breadcrumb">
  <ol className="flex items-center">
    {/* Always show All Products */}
    <li className="flex items-center">
      <Link
        className="whitespace-nowrap text-rush-blue-500 hover:text-rush-blue-600 hover:underline"
        to="/catalog"
      >
        All Products
      </Link>
      <div className="shrink-0 w-[1px] mx-2 h-3 rotate-12 bg-slate-500" />
    </li>

    {/* Grandparent */}
    {product?.category?.parent?.parent && (
      <li className="flex items-center">
        <Link
          to={`/category/${product.category.parent.parent._id}`}
          className="whitespace-nowrap text-rush-blue-500 hover:text-rush-blue-600 hover:underline"
        >
          {product.category.parent.parent.name}
        </Link>
        <div className="shrink-0 w-[1px] mx-2 h-3 rotate-12 bg-slate-500" />
      </li>
    )}

    {/* Parent */}
    {product?.category?.parent && (
      <li className="flex items-center">
        <Link
          to={`/category/${product.category.parent._id}`}
          className="whitespace-nowrap text-rush-blue-500 hover:text-rush-blue-600 hover:underline"
        >
          {product.category.parent.name}
        </Link>
        <div className="shrink-0 w-[1px] mx-2 h-3 rotate-12 bg-slate-500" />
      </li>
    )}

    {/* Current category (child) */}
    <li className="truncate whitespace-nowrap text-slate-500">
      {product?.category?.name}
    </li>
  </ol>
</nav>


            
            
            </div></div>
            <div class="text-slate-900 bg-white py-8"><div class="mx-auto max-w-[1440px] px-6"><div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col items-center md:items-start md:gap-2"><div class="flex flex-col gap-1"><h1 className="text-xl font-bold md:text-3xl">
  {product?.name}
</h1>
</div>
                    <div class="flex items-center gap-2">
                        <div class="relative inline-block overflow-hidden whitespace-nowrap font-sans text-lg leading-none tracking-wide text-transparent
                         before:absolute before:left-0 before:top-0 before:whitespace-nowrap before:font-sans before:text-slate-300 
                         before:content-[&#x27;★★★★★&#x27;] md:text-2xl" role="img" aria-label="5 out of 5 stars">
                            <div class="absolute left-0 top-0 overflow-hidden whitespace-nowrap font-sans text-yellow-500" 
                            style={{width:"100%"}} aria-hidden="true">★★★★★</div>★★★★★</div><button class="text text-sm/8 text-rush-blue-500">3 reviews</button>
                            </div></div>
                            
                            
                            
                         <div className="md:col-start-1 md:row-start-1 md:row-span-3">
  <div className="carousel relative w-full">
    <div className="flex flex-row gap-2 overflow-hidden">
      {/* Thumbnails */}
      <div className="md:basis-1/8 hidden md:flex md:flex-col gap-2">
        {product?.images?.map((img, idx) => (
          <button
            key={idx}
            aria-label={`slide dot ${idx}`}
            type="button"
            className="carousel__dot"
          >
            <img
              src={img}
              alt={product?.name || `Image ${idx + 1}`}
              className="h-12 w-12 object-contain border border-slate-200 hover:border-black/30"
            />
          </button>
        ))}
      </div>

      {/* Main slider */}
      <div className="relative flex flex-1 justify-center">
        {product?.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product?.name}
            className="w-full max-h-[500px] object-contain"
          />
        ) : (
          <p className="text-gray-500">No image available</p>
        )}
      </div>
    </div>
  </div>
</div>

                                            <div class="flex flex-col gap-8">
                                              
                                              
                                       <div className="flex items-center gap-4">
  <p className="font-bold">Selected Color:</p>
  {selectedColor && (
    <>
      <button
        type="button"
        className="relative flex items-center justify-center overflow-hidden rounded-md border border-black/15 bg-contain outline outline-2 outline-offset-2 outline-transparent m-0 h-10 w-10"
        disabled
        title={selectedColor}
      >
        <div className="flex h-full w-full">
          <span
            className="h-full w-full"
            style={{
              backgroundColor:
                availableColors.find((c) => c.name === selectedColor)?.hex,
            }}
          ></span>
        </div>
      </button>
      <p>{selectedColor}</p>
    </>
  )}
<ul className="flex flex-wrap items-center gap-1 md:justify-center">
  {product?.color?.slice(0, 6).map((colorName) => {
    const colorObj = availableColors.find((c) => c.name === colorName);
    if (!colorObj) return null;

    return (
      <li key={colorName}>
        <button
          type="button"
          onClick={() => setSelectedColor(colorName)}
          className={`relative m-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-black/15 bg-contain outline outline-2 outline-offset-2 ${
            selectedColor === colorName
              ? "outline-rush-blue-500"
              : "outline-transparent hover:outline-rush-blue-500"
          }`}
          title={colorObj.name}
        >
          <div className="flex h-full w-full">
            <span
              className="h-full w-full"
              style={{ backgroundColor: colorObj.hex }}
            ></span>
          </div>
          {selectedColor === colorName && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute h-5 w-5 text-white/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </button>
      </li>
    );
  })}

  {product?.color?.length > 6 && (
    <li className="flex justify-end text-sm text-slate-500">
      +{product?.color.length - 6} colors
    </li>
  )}
</ul>


</div>

                                                                  
                                                                  
{product?.decorationMethods && product.decorationMethods.length > 0 && (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold">Decoration Method:</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {product.decorationMethods.map((method, index) => (
        <button
          key={index}
          className="flex flex-col items-start justify-center 
            border-2 border-slate-200 bg-white text-base font-normal 
            hover:border-primary rounded-2xl px-4 py-2 h-16 w-full"
        >
          <p className="font-bold">{method.name}</p>
          <p className="text-sm font-normal">{method.note}</p>
        </button>
      ))}
    </div>
  </div>
)}

                                                                     
                                                                     
                                                                     <a href="../../../design/indexbb41.html?method=scr&amp;item=7278&amp;color=22019" class="items-center
                                                                      justify-center whitespace-nowrap font-bold ring-offset-background transition-colors focus-visible:outline-none
                                                                       focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                                                        bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-12 py-4 text-xl hidden md:block md:h-fit md:w-fit">
                                                                        Start Designing</a></div><div class="flex flex-col gap-4"><div class="flex w-full gap-4"><div class="flex basis-1/2
                                                                         flex-row gap-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck
                                                                          size-10 shrink-0 rounded-full bg-slate-100 p-2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2">
                                                                          </path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14">
                                                                          </path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg><div><p class="font-bold">
                                                                          Free Delivery</p><p class="text-sm md:text-nowrap">As soon as <span class="text-nowrap">...</span></p></div>
                                                                          </div></div><div class="flex w-full gap-4"><div class="flex basis-1/2 flex-row gap-4">
                                                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag size-10
                                                                            rounded-full bg-slate-100 p-2"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                                                                            </path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg><div><p class="font-bold">Material</p>
                                                                            <p class="text-sm">{product?.material}</p></div></div><div class="flex basis-1/2 flex-row gap-4"><svg xmlns="http://www.w3.org/2000/svg" 
                                                                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                                             class="lucide lucide-dollar-sign h-10 w-10 rounded-full bg-slate-100 p-2"><line x1="12" x2="12" y1="2" y2="22"></line>
                                                                             <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg><div><p class="font-bold">Price</p><p class="text-sm">
                                                                             {product?.discountPrice}</p></div></div></div></div></div></div></div><section aria-labelledby="product-info-heading"><h2 id="product-info-heading"
                                                                              class="sr-only">Product Details and Specifications</h2><div class="text-slate-900 bg-slate-100 py-8 md:pb-8 md:pt-16">
                                                                              <div class="mx-auto max-w-[1440px] px-6"><div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
                                                                              <div class="flex flex-col gap-8 lg:gap-16"><div><h3 class="mb-4 text-xl font-bold">Product Description</h3>
                                                                              <div class="text-sm text-gray-600"><p>{product?.description}</p></div></div><div><h3 class="mb-4 text-xl font-bold">Available Sizes</h3><ul class="list-inside list-disc text-sm
                                                                                leading-7 group-data-[state=closed]:hidden"><li class="py-1"><div class="inline-flex items-center gap-2"><span class="font-bold">
                                                                                {product?.size}</span><button class="inline-flex items-center justify-center whitespace-nowrap font-bold
                                                                                 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                                                                                 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 normal-case text-primary underline-offset-4
                                                                                  hover:underline rounded-2xl h-auto p-0 text-base" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R7kp36m:"
                                                                                   data-state="closed">Sizing Details</button></div></li>
                                                                                   
                                                                                   
                                                                                   </ul></div>
                                                                                   
                                                                                   <div>
                                                                                    
                                                                                    
                         {product?.brand && (
  <div className="mt-6">
    <h2 id="product-info-heading" style={{fontWeight: "800", fontSize: "20px"}}>Brand</h2>

    {product?.brand?.image && (
      <img
        src={product.brand.image}
        alt={product.brand.name}
        className="mb-4 w-[200px] h-[200px] object-contain rounded"
      />
    )}

    {product?.brand?.description && (
      <p className="text-sm text-gray-600">{product.brand.description}</p>
    )}

    <ul className="mt-4 flex gap-4 flex-wrap">
      <li>
        <a
          href={`/brands/${product.brand?._id}`}
          className="inline-flex items-center justify-center whitespace-nowrap 
            text-sm font-bold border-2 border-primary text-primary 
            hover:bg-primary hover:text-white h-8 rounded-xl px-3"
        >
          All {product.brand?.name}
        </a>
      </li>
      <li>
        <a
          href={`/brands/${product.brand?._id}/t-shirts`}
          className="inline-flex items-center justify-center whitespace-nowrap 
            text-sm font-bold border-2 border-primary text-primary 
            hover:bg-primary hover:text-white h-8 rounded-xl px-3"
        >
          T-Shirts
        </a>
      </li>
      <li>
        <a
          href={`/brands/${product.brand?._id}/polos`}
          className="inline-flex items-center justify-center whitespace-nowrap 
            text-sm font-bold border-2 border-primary text-primary 
            hover:bg-primary hover:text-white h-8 rounded-xl px-3"
        >
          Polos
        </a>
      </li>
    </ul>
  </div>
)}


                                                                                                     
                                                                                                     </div>
                                                                                                     
                                                                                                     
                                                                                                     </div>
                                                                                                     
                                                                                                     
                                                                                               {/* Product Details */}
{product?.features?.length > 0 && (
  <div>
    <h3 className="mb-4 text-xl font-bold">Product Details</h3>
    <div
      className="prose mb-0 max-w-none text-sm
      group-data-[state=closed]:hidden prose-a:text-primary 
      prose-a:no-underline hover:prose-a:underline lg:mb-8"
    >
      <ul>
        {product?.features
          .flatMap((f) => f.split(",")) // split string if it's comma-separated
          .map((item, idx) => (
            <li key={idx}>{item.trim()}</li> // remove extra spaces
          ))}
      </ul>
    </div>
  </div>
)}

                                                                                                      
                                                                                                      
                                          <div className="flex flex-col gap-8 lg:gap-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold">Flexible Payment Options</h2>
        <p className="text-sm">
          Split your purchase into easy monthly payments with our trusted partners
        </p>
       {/*} <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4 md:gap-x-4 md:gap-y-0">
          <img
            src="/logo-affirm.png"
            alt="Affirm Logo"
            className="h-16 w-auto object-contain md:h-20"
          />
          <img
            src="/logo-sezzle.png"
            alt="Sezzle Logo"
            className="h-16 w-auto object-contain md:h-20"
          />
          <img
            src="/logo-afterpay.png"
            alt="Afterpay Logo"
            className="h-16 w-auto object-contain md:h-20"
          />
          <img
            src="/logo-klarna.png"
            alt="Klarna Logo"
            className="h-16 w-auto object-contain md:h-20"
          />
        </div>*/}
      </div>
    </div>
                                                                                                                </div></div></div></section>
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                

                                                                                                                                                                   
                                                                                                                                                                   
                                                                                                                                                                   <section><div class="text-slate-900 bg-slate-100 py-8"><div class="mx-auto max-w-[1440px] px-6"><h2 class="mb-4 flex justify-center text-3xl font-semibold md:mb-8">Related Styles</h2><ul class="bg-red flex flex-col gap-4 md:grid md:grid-cols-4 md:gap-8"><article class="flex h-full flex-col overflow-hidden rounded-2xl border bg-white hover:shadow-md"><a class="flex md:flex-grow md:flex-col" href="../../a4/kids-cooling-performance-shirt/index.html">
                                                                                                                                                                  <div class="relative flex basis-2/5 items-center md:w-full md:max-w-none"><div class="absolute left-0 top-0 md:left-auto md:right-0"></div><div class="absolute bottom-0 left-0 md:left-auto md:right-0"></div><div class="absolute inset-0 z-10 flex h-full w-full items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle size-16 animate-spin text-primary"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg></div><img alt="front with design" loading="lazy" width="550" height="550" decoding="async" data-nimg="1" class="absolute" style={{color:"transparent" }} srcSet="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=NB3142&amp;colorCode=59&amp;hideProduct=true 1x, https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=NB3142&amp;colorCode=59&amp;hideProduct=true 2x" src="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=NB3142&amp;colorCode=59&amp;hideProduct=true"/><img alt="NB3142 59 fr" loading="lazy" width="672" height="707" decoding="async" data-nimg="1" style={{color:"transparent" }}
                                                                                                                                                                  srcSet="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/nb3142_59_fr.jpg 1x, https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/nb3142_59_fr.jpg 2x" src="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/nb3142_59_fr.jpg"/></div><div class="flex basis-3/5 flex-col justify-center gap-2 px-2 py-3 md:w-full md:flex-grow md:justify-between"><h3 class="text-balance text-lg font-bold md:text-center">A4 Moisture Wicking Kids&#x27; T-Shirt
                                                                                                                                                                  </h3><div class="flex flex-col gap-1 md:items-center"><div class="flex flex-col md:items-center"><ul class="flex flex-wrap items-center gap-1 md:justify-center"></ul></div><div class="flex items-center gap-2">
                                                                                                                                                                    <div class="relative inline-block overflow-hidden whitespace-nowrap font-sans text-lg leading-none tracking-wide text-transparent before:absolute before:left-0 before:top-0 before:whitespace-nowrap before:font-sans before:text-slate-300 before:content-[&#x27;★★★★★&#x27;] md:text-2xl" role="img" aria-label="4.8 out of 5 stars"><div class="absolute left-0 top-0 overflow-hidden whitespace-nowrap font-sans text-yellow-500" style={{width:"90%"}} aria-hidden="true">★★★★★</div>★★★★★</div><p class="text-sm">38 reviews</p></div><div class="flex items-center text-sm md:justify-center"><p>YXS - YXL</p><div data-orientation="vertical" role="none" class="shrink-0 w-[1px] mx-2 h-3 bg-slate-400"></div><p>No Minimum
                                                                                                                                                                        </p></div><div data-test="pricing" class="flex items-center gap-1 md:justify-center"><div class="text-sm"><span class="font-semibold">$14.56</span> 
                                                                                                                                                                 each for 50 items</div><button data-state="closed" aria-label="Quote Details"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info hidden size-5 cursor-help text-slate-400 hover:text-slate-600 md:block"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button><button type="button" aria-haspopup="dialog" aria-expanded="false" 
                                                                                                                                                                 aria-controls="radix-:R1p8pj6m:" data-state="closed"
                                                                                                                                                                   aria-label="Open quote pricing details"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info 
                                                                                                                                                                   size-5 text-slate-500 hover:text-rush-blue-600 md:hidden"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button></div></div></div></a></article><article class="flex h-full flex-col overflow-hidden rounded-2xl border bg-white hover:shadow-md"><a class="flex md:flex-grow md:flex-col" href="../../sport-tek/kids-posi-uv-pro-long-sleeve-tee/index.html">
                                                                                                                                                                   <div class="relative flex basis-2/5 items-center md:w-full md:max-w-none"><div class="absolute left-0 top-0 md:left-auto md:right-0"></div><div class="absolute bottom-0 left-0 md:left-auto md:right-0"></div><div class="absolute inset-0 z-10 flex h-full w-full items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle size-16 animate-spin text-primary"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg></div><img alt="front with design"
                                                                                                                                                                    loading="lazy" width="550" height="550" decoding="async" data-nimg="1" class="absolute"style={{color:"transparent" }} srcSet="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=YST420LS&amp;colorCode=65ca&amp;hideProduct=true 1x, https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=YST420LS&amp;colorCode=65ca&amp;hideProduct=true 2x"
                                                                                                                                                                     src="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=YST420LS&amp;colorCode=65ca&amp;hideProduct=true"/><img alt="YST420LS 65ca fr" loading="lazy" width="672" height="707" decoding="async" data-nimg="1" style={{color:"transparent" }} srcSet="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/yst420ls_65ca_fr.jpg 1x,
                                                                                                                                                                    https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/yst420ls_65ca_fr.jpg 2x" src="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/yst420ls_65ca_fr.jpg"/></div><div class="flex basis-3/5 flex-col
                                                                                                                                                                   justify-center gap-2 px-2 py-3 md:w-full md:flex-grow md:justify-between"><h3 class="text-balance text-lg font-bold md:text-center">Sport-Tek Kids Posi-UV Pro Long Sleeve Tee</h3><div class="flex flex-col gap-1 md:items-center"><div class="flex flex-col md:items-center"><ul class="flex flex-wrap items-center gap-1 md:justify-center"></ul></div><div class="flex items-center gap-2"><div class="relative inline-block overflow-hidden whitespace-nowrap font-sans text-lg leading-none tracking-wide text-transparent before:absolute before:left-0 before:top-0 before:whitespace-nowrap before:font-sans before:text-slate-300 before:content-[&#x27;★★★★★&#x27;] md:text-2xl" role="img" aria-label="5 out of 5 stars"><div class="absolute left-0 top-0 overflow-hidden whitespace-nowrap font-sans text-yellow-500" style={{width:"100%"}} aria-hidden="true">★★★★★</div>★★★★★</div><p class="text-sm">1 review</p>
                                                                                                                                                                   </div><div class="flex items-center text-sm md:justify-center"><p>YXS - YXL</p><div data-orientation="vertical" role="none" class="shrink-0 w-[1px] mx-2 h-3 bg-slate-400"></div><p>No Minimum</p></div><div data-test="pricing" class="flex items-center gap-1 md:justify-center"><div class="text-sm"><span class="font-semibold">$12.66</span> each for 50 items</div><button data-state="closed" aria-label="Quote Details"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info hidden size-5 cursor-help text-slate-400 hover:text-slate-600 md:block"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>
                                                                                                                                                                   </svg></button><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R1p99j6m:" data-state="closed" aria-label="Open quote pricing details"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info size-5 text-slate-500 hover:text-rush-blue-600 md:hidden">
                                                                                                                                                                    <circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button></div></div></div></a></article><article class="flex h-full flex-col overflow-hidden 
                                                                                                                                                                   rounded-2xl border bg-white hover:shadow-md"><a class="flex md:flex-grow md:flex-col" href="../../port-company/kids-long-sleeve-performance-tee/index.html"><div class="relative flex basis-2/5 items-center md:w-full md:max-w-none"><div class="absolute left-0 top-0 md:left-auto md:right-0"></div><div class="absolute bottom-0 left-0 md:left-auto md:right-0"></div><div class="absolute inset-0 z-10 flex h-full w-full items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                                                                                                                                                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle size-16 animate-spin text-primary"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg></div><img alt="front with design" loading="lazy" width="550" height="550" decoding="async" data-nimg="1" class="absolute" style={{color:"transparent" }} srcSet="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=PC380YLS&amp;colorCode=3c39&amp;hideProduct=true 1x, https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=PC380YLS&amp;colorCode=3c39&amp;hideProduct=true 2x" src="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTUyMTM2Mw_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=PC380YLS&amp;colorCode=3c39&amp;hideProduct=true"/><img alt="PC380YLS 3c39 fr" loading="lazy" width="672" height="707" decoding="async" data-nimg="1" style={{color:"transparent" }} srcSet="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/pc380yls_3c39_fr.jpg 1x, https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/pc380yls_3c39_fr.jpg 2x" src="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/pc380yls_3c39_fr.jpg"/></div><div class="flex basis-3/5 flex-col justify-center gap-2 px-2 py-3 md:w-full md:flex-grow md:justify-between"><h3 class="text-balance text-lg font-bold md:text-center">Port &amp; Company Kids Long Sleeve Performance Tee</h3><div class="flex flex-col gap-1 md:items-center">
                                                                                                                                                                    <div class="flex flex-col md:items-center"><ul class="flex flex-wrap items-center gap-1 md:justify-center">
                                                                                                                                                                   </ul></div><div class="flex items-center text-sm md:justify-center"><p>YXS - YXL</p><div data-orientation="vertical" role="none" class="shrink-0 w-[1px] mx-2 h-3 bg-slate-400"></div><p>No Minimum</p></div><div data-test="pricing" class="flex items-center gap-1 md:justify-center"><div class="text-sm"><span class="font-semibold">$13.81</span> each for 50 items</div><button data-state="closed" aria-label="Quote Details"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info hidden size-5 cursor-help text-slate-400 hover:text-slate-600 md:block"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R1p9pj6m:" data-state="closed" aria-label="Open quote pricing details"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info size-5 text-slate-500 hover:text-rush-blue-600 md:hidden"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button></div></div></div></a></article><article class="flex h-full flex-col overflow-hidden rounded-2xl border bg-white hover:shadow-md"><a class="flex md:flex-grow md:flex-col" href="../../nike/kids-swoosh-sleeve-rlegend-tee/index.html">
                                                                                                                                                                   <div class="relative flex basis-2/5 items-center md:w-full md:max-w-none"><div class="absolute left-0 top-0 md:left-auto md:right-0"></div><div class="absolute bottom-0 left-0 md:left-auto md:right-0"><div class="max-h-22px relative whitespace-nowrap text-sm font-semibold leading-4 tracking-[.25px] flex items-center gap-1 bg-green-200 text-green-900 rounded-tr-2xl px-4 py-2 md:rounded-tl-2xl md:rounded-tr-none"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf size-4"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>Eco-Friendly</div></div><div class="absolute inset-0 z-10 flex h-full w-full items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle size-16 animate-spin text-primary"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg></div><img alt="front with design" loading="lazy" width="550" height="550" decoding="async" data-nimg="1" class="absolute" style={{color:"transparent" }} srcSet="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTM5NjQwNA_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=NKDX8787&amp;colorCode=bec7&amp;hideProduct=true 1x, https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTM5NjQwNA_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=NKDX8787&amp;colorCode=bec7&amp;hideProduct=true 2x"
                                                                                                                                                                    src="https://cdn.rushordertees.com/design/resources/scripts/ZoomImage.php?src=NTM5NjQwNA_f&amp;x=230&amp;y=300&amp;width=550&amp;height=550&amp;scale=1&amp;watermark=false&amp;autoInvertDesign=true&amp;style=NKDX8787&amp;colorCode=bec7&amp;hideProduct=true"/><img alt="NKDX8787 bec7 fr" loading="lazy" width="672" height="707" decoding="async" data-nimg="1" style={{color:"transparent" }}
                                                                                                                                                                    srcSet="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/nkdx8787_bec7_fr.jpg 1x, https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/nkdx8787_bec7_fr.jpg 2x" src="https://cdn.legacy.images.rushordertees.com/unsafe/672x707/eztees-catalogrebuild.s3.amazonaws.com/modelImages/nkdx8787_bec7_fr.jpg"/></div><div class="flex basis-3/5 flex-col justify-center gap-2 px-2 py-3 md:w-full md:flex-grow md:justify-between"><h3 class="text-balance text-lg font-bold md:text-center">Nike Kids Swoosh Sleeve rLegend Tee</h3><div class="flex flex-col gap-1 md:items-center">
                                                                                                                                                                    <div class="flex flex-col md:items-center"><ul class="flex flex-wrap items-center gap-1 md:justify-center"></ul></div><div class="flex items-center gap-2"><div class="relative inline-block overflow-hidden whitespace-nowrap font-sans text-lg leading-none tracking-wide text-transparent before:absolute before:left-0 before:top-0 before:whitespace-nowrap before:font-sans before:text-slate-300 before:content-[&#x27;★★★★★&#x27;] md:text-2xl" role="img" aria-label="5 out of 5 stars"><div class="absolute left-0 top-0 overflow-hidden whitespace-nowrap font-sans text-yellow-500" style={{width:"100%"}} aria-hidden="true">★★★★★</div>★★★★★</div><p class="text-sm">3 reviews</p></div><div class="flex items-center text-sm md:justify-center"><p>YXS - L/XL</p><div data-orientation="vertical" role="none" class="shrink-0 w-[1px] mx-2 h-3 bg-slate-400"></div><p>No Minimum</p></div><div data-test="pricing" class="flex items-center gap-1 md:justify-center"><div class="text-sm"><span class="font-semibold">$35.75</span> each for 50 items</div><button data-state="closed" aria-label="Quote Details"><svg xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info hidden size-5 cursor-help text-slate-400 hover:text-slate-600 md:block"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R1pa9j6m:" data-state="closed" aria-label="Open quote pricing details"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info size-5 text-slate-500 hover:text-rush-blue-600 md:hidden"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button></div></div></div></a></article></ul></div></div></section><section><div class="bg-slate-100 text-slate-900 py-2">
                                                                                                                                                                      
                                                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      </section></div>
                
                
                </main>
    <Footer />
    </>
  );
};

export default Single;
