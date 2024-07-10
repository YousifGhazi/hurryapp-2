import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function TipsCarousel() {
  const [tips, setTips] = useState([]);

  const fallback = [
    {
      title: "Stay Indoors",
      text: "Stay indoors with windows closed during high pollution.",
    },
    {
      title: "Air Purifier",
      text: "Use an air purifier to reduce indoor pollutants.",
    },
    {
      title: "Limit Outdoor Exercise",
      text: "Avoid outdoor exercise when air quality is poor.",
    },
    {
      title: "Wear a Mask",
      text: "Wear a mask if you must go outside on high pollution days.",
    },
    {
      title: "Monitor Air Quality",
      text: "Monitor air quality regularly if you have asthma or COPD.",
    },
    {
      title: "Nasal Saline Sprays",
      text: "Use nasal saline sprays to keep airways moist.",
    },
    {
      title: "Asthma Action Plan",
      text: "Follow your asthma action plan and adjust medication.",
    },
    {
      title: "Keep Medications Handy",
      text: "Keep medications handy if you have respiratory issues.",
    },
  ];


  // useEffect(() => {
  //   const fetchAITips = async () => {
  //     const genAI = new GoogleGenerativeAI(
  //       "AIzaSyDw1RjHEOjMF92tKYDALqHFqa8LpHFHLqY"
  //     );
  //     const model = genAI.getGenerativeModel({
  //       model: "gemini-1.5-flash",
  //       generationConfig: { responseMimeType: "application/json" },
  //     });
  //     const tips = await model.generateContent(`
  //       List 8 tips and recommendations for an air quality app, each tips should not exceed 9 words, use this JSON schema:
  //       {
  //         title: "Stay Indoors",
  //         text: "Stay indoors with windows closed during high pollution."
  //       }`);
  //     const tipsJSON = await JSON.parse(tips.response.text());
  //     console.log("json", tipsJSON);
  //     setTips(tipsJSON || fallback);
  //   };
  //   fetchAITips();
  // }, []);

  return (
    <Carousel className="ml-2 w-[90%]  md:mx-auto">
      <CarouselContent>
        {tips.length > 0 ? (
          tips.map((tip, index) => (
            <CarouselItem
              className="basis-[auto] md:basis-1/3 min-w-[280px] w-[50vw] md:w-full select-none"
              key={index}
            >
              <div className="p-1 h-full">
                <Card className="h-full">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{tip.title}</h3>
                    <p className="mt-2">{tip.text}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="basis-[auto] md:basis-1/3 min-w-[280px] w-[50vw] md:w-full select-none">
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="p-4">
                  <p className="mt-2">loading...</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

export default TipsCarousel;
