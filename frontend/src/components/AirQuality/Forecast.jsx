import { SmileFace } from "../home page/icons"
import { Card, CardContent } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { getIcon } from "./AQIstatus"

const Forecast = ({ data, aqi, status }) => {

    const [icon, color] = getIcon(status);

    return (
        <div className="my-8">
            <p className=" font-medium text-xs opacity-75 pb-3">Forecast</p>

            <Carousel className="m-auto">
                <CarouselContent className="gap-2 mx-auto">
                    {
                        data && data.map((v, i) => {
                            return (
                                <CarouselItem
                                    className="basis-[auto] w-fit p-0 select-none "
                                    key={i}
                                >
                                    <Card>
                                        <CardContent className="px-2 py-2 flex flex-col items-center justify-center">
                                            <p className=" text-[10x] font-light mb-1.5">17:00</p>
                                            {icon}
                                            <p className="text-base font-bold flex justify-center gap-2">
                                                {aqi} <span className=" text-[10px] font-normal">AQI</span>
                                            </p>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
        </div>
    )
}

export default Forecast