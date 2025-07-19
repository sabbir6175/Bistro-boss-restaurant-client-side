import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import image1 from "../../../assets/home/slide1.jpg"
import image2 from "../../../assets/home/slide2.jpg"
import image3 from "../../../assets/home/slide3.jpg"
const ChefRecommends = () => {
  return (
    <section className="p-5">
      <div>
        <SectionTitle
          heading="CHEF RECOMMENDS"
          subHeading="Should Try"
        ></SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className=" rounded-md shadow-md bg-gray-50 text-gray-800  p-5 border">
          <img
            src={image1}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide text-center">
                Caeser Salad
              </h2>
              <p className="text-gray-800">
              Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.
              </p>
            </div>
            <button className="btn btn-outline text-[#BB8506] shadow-2xl border-0 border-b-4 mt-4 uppercase">Add To Card</button>
          </div>
        </div>
        {/* card - 2 */}
        <div className=" rounded-md shadow-md bg-gray-50 text-gray-800  p-5 border">
          <img
            src={image2}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide">
                Pizzas
              </h2>
              <p className="text-gray-800">
              Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.
              </p>
            </div>
            <button className="btn btn-outline text-[#BB8506] shadow-2xl border-0 border-b-4 mt-4 uppercase">Add To Card</button>
          </div>
        </div>
        {/* card - 3 */}
        <div className=" rounded-md shadow-md bg-gray-50 text-gray-800 p-5 border">
          <img
            src={image3}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8 text-center" >
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide">
                Soups
              </h2>
              <p className="text-gray-800">
              Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.
              </p>
            </div>
            <button className="btn btn-outline text-[#BB8506] shadow-2xl border-0 border-b-4 mt-4 uppercase">Add To Card</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefRecommends;
