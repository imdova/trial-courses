import Tutor_1 from "@/assets/images/tutor-1.jpg";
import Tutor_2 from "@/assets/images/tutor-2.jpg";
import Tutor_3 from "@/assets/images/tutor-3.png";
import {
  ArrowRight,
  BadgeCheck,
  Book,
  CircleCheck,
  CirclePlay,
  Earth,
  File,
  Handshake,
  IdCard,
  Layers,
  Mail,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import IconBtn from "@/components/UI/Buttons/IconBtn";
import TestimonialCard from "@/components/UI/TestimonialCard";

type Testimonial = {
  id: number;
  quote: string;
  number: number; // Change to number
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    number: 1,
  },
  {
    id: 2,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    number: 2,
  },
];

const BecomeTutor: React.FC = () => {
  return (
    <main>
      <section>
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <h1 className="my-20 text-center text-3xl font-bold md:text-start md:text-5xl">
            Become an Tutor
          </h1>
        </div>
        <div className="flex min-h-[130px] items-center justify-between bg-[#eee] p-6">
          <div className="container mx-auto flex flex-wrap justify-between gap-10 px-6 lg:max-w-[1170px] lg:gap-4">
            <div className="flex w-[170px] justify-start gap-3 sm:w-[200px]">
              <UsersRound className="text-[#FF6636]" size={30} />
              <div>
                <h1 className="text-2xl font-semibold">67.1K</h1>
                <span className="text-muted-foreground text-sm">Students</span>
              </div>
            </div>
            <div className="flex w-[170px] justify-start gap-3 sm:w-[200px] lg:justify-start">
              <Book className="text-[#564FFD]" size={30} />
              <div>
                <h1 className="text-2xl font-semibold">26k</h1>
                <span className="text-muted-foreground text-sm">
                  Certified Instructor
                </span>
              </div>
            </div>
            <div className="flex w-[170px] justify-start gap-5 sm:w-[200px] lg:justify-start">
              <Earth className="text-[#E34444]" size={30} />
              <div>
                <h1 className="text-2xl font-semibold">72</h1>
                <span className="text-muted-foreground text-sm">
                  Country Language
                </span>
              </div>
            </div>
            <div className="flex w-[170px] justify-start gap-3 sm:w-[200px] lg:justify-start">
              <BadgeCheck className="text-[#23BD33]" size={30} />
              <div>
                <h1 className="text-2xl font-semibold">99.9%</h1>
                <span className="text-muted-foreground text-sm">
                  Success Rate
                </span>
              </div>
            </div>
            <div className="flex w-[170px] justify-start gap-3 sm:w-[200px] lg:justify-start">
              <Layers className="text-[#FD8E1F]" size={30} />
              <div>
                <h1 className="text-2xl font-semibold">57</h1>
                <span className="text-muted-foreground text-sm">
                  Trusted Companies
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <div className="flex flex-col gap-5 py-20 lg:flex-row">
            <div className="w-full">
              <Image
                className="rounded-xl object-cover"
                src="/images/image-2.jpg"
                alt="image-content"
              />
            </div>
            <div className="w-full p-3">
              <h1 className="mb-4 text-3xl font-semibold">
                Why you will start teaching on Tutor Hub
              </h1>
              <p className="text-muted-foreground mb-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry is standard dummy
                text ever since the 1500s
              </p>
              <div>
                <div className="mb-6 flex gap-4">
                  <CircleCheck className="text-primary" size={30} />
                  <div>
                    <h2>Tech your students as you want.</h2>
                    <p className="text-muted-foreground text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
                <div className="mb-6 flex gap-4">
                  <CircleCheck className="text-primary" size={30} />
                  <div>
                    <h2>Tech your students as you want.</h2>
                    <p className="text-muted-foreground text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
                <div className="mb-6 flex gap-4">
                  <CircleCheck className="text-primary" size={30} />
                  <div>
                    <h2>Tech your students as you want.</h2>
                    <p className="text-muted-foreground text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[130px] bg-[#eee] py-16">
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <h2 className="m-auto mb-8 text-center text-2xl font-semibold md:w-[400px] md:text-3xl">
            How you ll become successful instructor
          </h2>
          <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            <div className="h-[220px] w-[220px] rounded-lg bg-white p-4">
              <div className="m-auto mb-3 flex h-20 w-20 items-center justify-center rounded-md bg-[#564FFD1A]">
                <File size={30} className="text-[#564FFD]" />
              </div>
              <h2 className="m-auto mb-3 text-center text-lg font-semibold">
                1. Apply to become instructor.
              </h2>
              <p className="text-muted-foreground text-center text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </div>
            <div className="h-[220px] w-[220px] rounded-lg bg-white p-4">
              <div className="m-auto mb-3 flex h-20 w-20 items-center justify-center rounded-md bg-[#14B3E030]">
                <IdCard size={30} className="text-[#2BA149]" />
              </div>
              <h2 className="m-auto mb-3 text-center text-lg font-semibold">
                2. Setup & edit your profile.
              </h2>
              <p className="text-muted-foreground text-center text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </div>
            <div className="h-[220px] w-[220px] rounded-lg bg-white p-4">
              <div className="m-auto mb-3 flex h-20 w-20 items-center justify-center rounded-md bg-[#FFEEE8]">
                <CirclePlay size={30} className="#FF6636" />
              </div>
              <h2 className="m-auto mb-3 text-center text-lg font-semibold">
                3. Create your new course
              </h2>
              <p className="text-muted-foreground text-center text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </div>
            <div className="h-[220px] w-[220px] rounded-lg bg-white p-4">
              <div className="m-auto mb-3 flex h-20 w-20 items-center justify-center rounded-md bg-[#E1F7E3]">
                <Handshake size={30} className="text-[#23BD33]" />
              </div>
              <h2 className="m-auto mb-3 text-center text-lg font-semibold">
                4. Start teaching & earning
              </h2>
              <p className="text-muted-foreground text-center text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-16">
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full">
              <h2 className="mb-4 text-2xl font-semibold md:w-[400px] md:text-3xl">
                How you ll become successful instructor
              </h2>
              <p className="text-muted-foreground mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry s standard dummy
                text ever since the 1500s,
              </p>
              <ul className="mb-4 ml-5 list-disc">
                <li className="mb-3">Steady stream of new students</li>
                <li className="mb-3">Smart calendar</li>
                <li className="mb-3">Interactive classroom</li>
                <li className="mb-3">Convenient payment methods</li>
                <li className="mb-3">Professional development webinars</li>
                <li className="mb-3">Supportive tutor community</li>
                <li className="mb-3">Create a tutor profile now</li>
              </ul>
              <IconBtn width={300}>
                <span>Create a tutor profile now</span>
                <ArrowRight />
              </IconBtn>
            </div>
            <div className="w-full">
              <div className="relative mx-auto h-[350px] w-[300px] md:h-[450px] md:w-[400px]">
                <div>
                  <Image
                    src={Tutor_1}
                    alt="Person Learning"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="absolute top-0 left-0 h-36 w-36 bg-white"></span>
                <span className="absolute top-0 left-36 h-full w-4 bg-white"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eee] py-16">
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <div className="flex flex-col-reverse gap-8 lg:flex-row">
            <div className="w-full">
              <div className="relative mx-auto h-[350px] w-[300px] md:h-[450px] md:w-[400px]">
                <div>
                  <Image
                    src={Tutor_2}
                    alt="Person Learning"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="absolute top-0 right-0 h-36 w-36 bg-[#eee]"></span>
                <span className="absolute top-0 right-36 h-full w-4 bg-[#eee]"></span>
              </div>
            </div>
            <div className="w-full">
              <h2 className="mb-4 text-2xl font-semibold md:w-[400px] md:text-3xl">
                Dont worry were always here to help you
              </h2>
              <p className="text-muted-foreground mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry s standard dummy
                text ever since the 1500s,
              </p>
              <ul className="mb-4">
                <li className="mb-5 flex items-center gap-2">
                  <ArrowRight size={18} className="text-primary" />
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </span>
                </li>
                <li className="mb-5 flex items-center gap-2">
                  <ArrowRight size={18} className="text-primary" />
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </span>
                </li>
                <li className="mb-5 flex items-center gap-2">
                  <ArrowRight size={18} className="text-primary" />
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </span>
                </li>
                <li className="mb-5 flex items-center gap-2">
                  <ArrowRight size={18} className="text-primary" />
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </span>
                </li>
              </ul>
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">
                    Email us, anytime anywhere
                  </span>
                  <h2>help.Tutorhub@mail.com</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-16">
        <div className="container mx-auto px-6 lg:max-w-[1170px]">
          <div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
            <div className="w-full">
              <h2 className="mb-4 text-2xl font-semibold md:w-[400px] md:text-3xl">
                How you ll become successful instructor
              </h2>
              <p className="text-muted-foreground mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry s standard dummy
                text ever since the 1500s,
              </p>
              <TestimonialCard testimonials={testimonials} />
            </div>
            <div className="w-full">
              <div className="relative mx-auto h-full w-[300px] md:h-full md:w-[500px]">
                <div>
                  <Image
                    src={Tutor_3}
                    alt="Person Learning"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default BecomeTutor;
