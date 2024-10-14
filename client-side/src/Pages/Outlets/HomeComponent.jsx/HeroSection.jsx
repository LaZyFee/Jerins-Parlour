import HeroImage1 from "../../../assets/images/hero1.png";
import PrimaryButton from "../../../Components/PrimaryButton";

function HeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:p-12 shadow-xl lg:flex lg:flex-row-reverse ">
      <img src={HeroImage1} className="lg:w-full max-h-screen" alt="Hero" />
      <div className="w-full flex flex-col justify-center items-start p-6">
        <h1 className="text-5xl font-bold">
          Beauty Salon <br />
          For Every Women
        </h1>
        <p className="py-6">
          Lorem ipsum dolor sit amet, consectetur <br />
          adipiscing elit. Purus commodo ipsum duis <br />
          laoreet maecenas. Feugiat
        </p>
        <PrimaryButton>Get an Appointment</PrimaryButton>
      </div>
    </div>
  );
}

export default HeroSection;