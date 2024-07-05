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
    <Carousel className="m-auto w-[90%] max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            className="basis-[auto] w-[85%] select-none"
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
      <CarouselPrevious className="hidden lg:block" />
      <CarouselNext className="hidden lg:block" />
    </Carousel>
  );
}

export default TipsCarousel;
