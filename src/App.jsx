import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Error from "./components/Error"
import Products, { AddNewProduct, EditProduct } from "./components/Products"
import Careers, { CareerList } from "./components/Careers"
import AboutUs, { ShowAboutUs } from "./components/AboutUs"
import Categories, { AddNewCategory, AddNewSubCategory } from "./components/Categories"
import Services from "./components/Services"
import OurWorks, { AddCategoryWork, AddWork, WorkCategory } from "./components/OurWorks"
import Offers, { AddCategoryOffer, AddOffer, OffersCategory } from "./components/Offers"
import Suppliers, { AddSupplier } from "./components/Suppliers"
import Clients, { AddClient, EditClient } from "./components/Clients"
import Slider, { AddSlider } from "./components/Slider"
import ContactUs, { AddContact } from "./components/ContactUs"
import Home from "./website/components/Home"
import ServicesPage from "./website/components/ServicesPage"
import WebOffers from "./website/components/WebOffers"
import WebAboutus from "./website/components/WebAboutus"
import Webcareer from "./website/components/Webcareer"
import WebBlog from "./website/components/WebBlog"
import WebProduct from "./website/components/WebProduct"
import WebOne from "./website/components/WebOne"
import SubServices from "./website/components/SubServices"
import SubId from "./website/components/SubId"
import WebWork from "./website/components/WebWork"
import Cart from "./website/components/Cart"
import Programs from "./website/components/Programs"
import SubPrograms from "./website/components/SubPrograms"
import CartContextProvider from "./context/CartContext"
import Orders from "./components/Orders"
import Program, { AddProgram, AddcategoryProgram, CategoryProgram } from "./website/components/Program"
import Social, { AddSocial } from "./website/components/Social"

function App() {
  return (
    <CartContextProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="addproduct" element={<AddNewProduct />}/>
            <Route path="products" element={<Products />}/>
            <Route path="edit/:id" element={<EditProduct />}/>
            <Route path="categories" element={<Categories />}/>
            <Route path="addcategory" element={<AddNewCategory />}/>
            <Route path="addsubcategory" element={<AddNewSubCategory />}/>
            <Route path="slider" element={<Slider />}/>
            <Route path="addslider" element={<AddSlider />}/>
            <Route path="clients" element={<Clients />}/>
            <Route path="addclient" element={<AddClient />}/>
            <Route path="add-career" element={<Careers />}/>
            <Route path="careers" element={<CareerList />} />
            <Route path="aboutUs" element={<ShowAboutUs />}/>
            <Route path="create-aboutus" element={<AboutUs />}/>
            <Route path="services" element={<Services />}/>
            <Route path="suppliers" element={<Suppliers />}/>
            <Route path="addsupplier" element={<AddSupplier/>} />
            <Route path="contactus" element={<ContactUs />}/>
            <Route path="add-contactus" element={<AddContact />}/>
            <Route path="offers" element={<Offers />}/>
            <Route path="program" element={<Program />}/>
            <Route path="add-program" element={<AddProgram />}/>
            <Route path="add-category-program" element={<AddcategoryProgram />}/>
            <Route path="category-program" element={<CategoryProgram />}/>
            <Route path="social" element={<Social />}/>
            <Route path="add-socail" element={<AddSocial />}/>
            <Route path="catgroy-offers" element={<OffersCategory />}/>
            <Route path="add-work" element={<AddWork />}/>
            <Route path="add-category-work" element={<AddCategoryWork />}/>
            <Route path="ourWorks" element={<OurWorks />}/>
            <Route path="work-category" element={<WorkCategory />}/>
            <Route path="add-offer" element={<AddOffer />}/>
            <Route path="add-catgeory-offer" element={<AddCategoryOffer />}/>
            <Route path="orders" element={<Orders />}/>
            <Route path="*" element={<Error />}/>
            <Route path="edit-client/:id" element={<EditClient />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  )
}
export default App
//data DashBoard For iti will be lastData
