import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

function TipsCarousel() {
  return (
    <Carousel className="ml-2 w-[90%]  md:mx-auto">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            className="basis-[auto] md:basis-1/3 min-w-[280px] w-[50vw] md:w-full select-none"
            key={index}
          >
            <div className="p-1">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">Title</h3>
                  <p className="mt-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
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
