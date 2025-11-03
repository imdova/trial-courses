"use client";
import Background_1 from "@/assets/images/prometric_1.jpg";
import Image_1 from "@/assets/images/prometric_2.png";
import Image_2 from "@/assets/images/prometric_3.png";
import Logo_1 from "@/assets/images/logo-1.png";
import Logo_2 from "@/assets/images/logo-2.png";
import Logo_3 from "@/assets/images/logo-3.png";
import Logo_4 from "@/assets/images/logo-4.png";
import Logo_5 from "@/assets/images/logo-5.png";
import Logo_6 from "@/assets/images/logo-6.png";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import InstructorsSlide from "@/components/UI/ExamSlider";
import { ExamsData } from "@/constants/exams.data";
import { BookMarked, GraduationCap, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PrometricExams: React.FC = () => {
  return (
    <main>
      {/* Landing Review Content  */}
      <section className="relative py-6">
        <Image
          className="absolute h-full top-0 left-0 object-cover"
          src={Background_1}
          alt="About Background"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#FFFFFFE5]"></div>
        <div className="min-h-[600px] flex items-center">
          <div className="relative container mx-auto px-6 lg:max-w-[1170px]">
            <div className="flex justify-between items-center flex-col lg:flex-row w-full">
              <div className="flex flex-col justify-between items-center lg:items-start w-full text-center lg:text-start">
                <span className="block w-fit bg-[#2BA14933] text-primary p-3 mb-3 rounded-3xl">
                  15 Years of Experience
                </span>
                <h2 className="text-4xl font-semibold mb-3 leading-relaxed">
                  Pass Your Gulf Prometric Exam with Confidence Your Success
                  Starts Here!
                </h2>
                <p className="text-muted-foreground mb-3">
                  Access the most comprehensive question bank tailored for
                  SCFHS, DHA, HAAD, MOH, OMSB, and more. Trusted by healthcare
                  professionals worldwide.
                </p>
                <Link
                  className="block w-fit mt-3 text-white py-3 px-4 bg-primary rounded-3xl text-sm hover:bg-black link-smooth"
                  href={"#"}>
                  Find Your Exam
                </Link>
              </div>
              <div className="hidden lg:flex justify-end w-full">
                <Image
                  className="rounded-s-full object-cover border-8 border-primary"
                  src={Image_1}
                  alt="About Background"
                  width={550}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="relative container mx-auto px-6 lg:max-w-[1170px]">
          <h1 className="text-center text-4xl font-bold mb-6">
            Explore Popular Prometric Exam Packages
          </h1>
          <InstructorsSlide ExamData={ExamsData} />
          <div className="flex items-center flex-col lg:flex-row gap-5 mt-14 ">
            <div className="flex justify-center w-full">
              <div className="max-w-[350px] h-[500px] rounded-full overflow-hidden border-r-4 border-primary">
                <Image
                  className="object-cover w-full h-full"
                  src={Image_2}
                  alt="About Background"
                />
              </div>
            </div>
            <div className="w-full">
              <span className="block text-primary font-semibold mb-4">
                About Medicova Online Exams
              </span>
              <h2 className="text-4xl font-semibold mb-4">
                Welcome To Medicova Online Exams
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-12">
                Medicova is your ultimate partner for passing Gulf Prometric
                exams like SCFHS, DHA, HAAD, MOH, and OMSB. We provide expertly
                curated question banks, detailed explanations, and real exam
                simulations to help healthcare professionals succeed. Trusted by
                thousands, Medicova is designed to make your exam preparation
                efficient, effective, and stress-free. Start your journey to
                success today!
              </p>
              <ul>
                <li className="flex gap-3 mb-6">
                  <div className="w-14">
                    <div className="flex justify-center items-center w-14 h-14 rounded-full text-primary bg-[#2BA14933]">
                      <GraduationCap size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Tailored for Gulf Exams
                    </h2>
                    <p className="text-muted-foreground">
                      Question banks specifically designed for SCFHS, DHA, HAAD,
                      MOH, OMSB, and other Gulf Prometric exams.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 mb-6">
                  <div className="w-14">
                    <div className="flex justify-center items-center w-14 h-14 rounded-full text-primary bg-[#2BA14933]">
                      <TrendingUp size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      High-Yield Questions:
                    </h2>
                    <p className="text-muted-foreground">
                      Curated by experts to reflect the latest exam patterns and
                      syllabi.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 mb-6">
                  <div className="w-14">
                    <div className="flex justify-center items-center w-14 h-14 rounded-full text-primary bg-[#2BA14933]">
                      <BookMarked size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Detailed Explanations:
                    </h2>
                    <p className="text-muted-foreground">
                      Understand the ,why behind every answer with in-depth
                      explanations.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 mb-6">
                  <div className="w-14">
                    <div className="flex justify-center items-center w-14 h-14 rounded-full text-primary bg-[#2BA14933]">
                      <BookMarked size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Detailed Explanations:
                    </h2>
                    <p className="text-muted-foreground">
                      Understand the why behind every answer with in-depth
                      explanations.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 mb-6">
                  <div className="w-14">
                    <div className="flex justify-center items-center w-14 h-14 rounded-full text-primary bg-[#2BA14933]">
                      <BookMarked size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Flexible Learning:
                    </h2>
                    <p className="text-muted-foreground">
                      Study anytime, anywhere on your laptop, tablet, or phone.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 mb-6">
                  <div className="w-14">
                    <div className="flex justify-center items-center w-14 h-14 rounded-full text-primary bg-[#2BA14933]">
                      <BookMarked size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Proven Results:
                    </h2>
                    <p className="text-muted-foreground">
                      Join thousands of healthcare professionals who have aced
                      their exams with Medicova.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 py-10">
            {[Logo_1, Logo_2, Logo_3, Logo_4, Logo_5, Logo_6].map(
              (logo, index) => {
                return (
                  <Image
                    key={index}
                    className="object-cover w-[100px] lg:w-[170px] m-auto"
                    src={logo}
                    alt="Logo marker"
                  />
                );
              }
            )}
          </div>
        </div>
      </section>
      <section className="relative py-6">
        <Image
          className="absolute h-full top-0 left-0 object-cover w-full"
          src={Image_1}
          alt="About Background"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#FFFFFFE5]"></div>
        <div className="relative container mx-auto px-6 lg:max-w-[1170px]">
          <div className="min-h-[400px] flex justify-center items-center">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-4">
                Your Exam, Your Success We have Got You Covered!
              </h2>
              <p className="text-muted-foreground text-center mb-10">
                Medicova offers specialized question banks for all major Gulf
                Prometric exams:
              </p>
              <MainBtn width="150px">Start Free Trial</MainBtn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default PrometricExams;
