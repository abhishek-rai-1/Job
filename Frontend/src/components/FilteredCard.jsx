import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

export const FilteredCard = () => {
  const filteredData = [
    {
      filterType: "Location",
      array: ['All', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai']
    },
    {
      filterType: 'Industry',
      array: ['frontend Developer', 'Backend Developer', 'Fullstack Developer']
    },
    {
      filterType: 'Salary',
      array: ['0-40 k', '40-1 lakh', '1-5 lakh']
    }
  ]
  return (
    <>
      <h2 className="text-center text-xl">Filter Jobs</h2>
      {
        filteredData.map((item, index) => (
          <div className="flex flex-col gap-2 my-3">
            <h3 className="font-semibold text-gray-600">{item.filterType}</h3>
            <RadioGroup>
              {
                item.array.map((data, ind) => {
                  return (
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem value={data} />
                      <Label className="text-gray-500">{data}</Label>
                    </div>
                  )
                })
              }
            </RadioGroup>
          </div>
        ))
      }
    </>
  )
}
