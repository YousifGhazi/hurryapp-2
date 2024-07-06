import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

function TipsCarousel() {
  const airQualityTips = [
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
    {
      title: "Avoid Smoke",
      text: "Avoid smoking and secondhand smoke exposure.",
    },
    {
      title: "Stay Hydrated",
      text: "Hydrate well to keep mucous membranes moist.",
    },
    {
      title: "Nebulizer Use",
      text: "Use a nebulizer for severe asthma",
    },
    {
      title: "Avoid Candles",
      text: "Limit the use of candles and incense indoors.",
    },
    {
      title: "Indoor Plants",
      text: "Plant air-purifying indoor plants.",
    },
    {
      title: "Check Pollen Forecasts",
      text: "Check pollen forecasts if you have allergies.",
    },
    {
      title: "Emergency Contacts",
      text: "Keep emergency contacts updated for quick assistance.",
    },
  ];

  return (
    <Carousel className="ml-2 w-[90%]  md:mx-auto">
      <CarouselContent>
        {airQualityTips.map((tip, index) => (
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
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

export default TipsCarousel;
