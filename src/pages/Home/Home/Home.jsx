import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefRecommends from "../ChefRecommends/ChefRecommends";
import ContactOp from "../Contact/ContactOp";
import Featured from "../Featured/Featured";
import OptionalSection from "../OptionalSection/OptionalSection";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <OptionalSection></OptionalSection>
            <PopularMenu></PopularMenu>
            <ContactOp></ContactOp>
            <ChefRecommends></ChefRecommends>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;