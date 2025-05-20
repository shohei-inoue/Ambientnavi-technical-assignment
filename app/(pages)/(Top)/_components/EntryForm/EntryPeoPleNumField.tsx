import { SetStateAction } from "react"
import EntryItem from "./EntryItem"
import Input from "@/app/components/Input/Input"

type EntryPeopleNumFieldProps = {
  value: number
  setValue: React.Dispatch<SetStateAction<number>>
}

const EntryPeopleNumField: React.FC<EntryPeopleNumFieldProps> = ({
  value, setValue
}) => {
  return (
    <EntryItem title="人数">
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        minLength={1}
      />
      <p>人</p>
    </EntryItem>
  )
}

export default EntryPeopleNumField