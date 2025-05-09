import Image from "next/image" 

type MenuCardProps = {
  id: number,
  name: string,
  price: number,
  image: string,
}

const MenuCard: React.FC<MenuCardProps> = ({
  id,
  name,
  price,
  image,
}) => {
  return (
    <li key={id} className="flex-column justify-between p-4 border">
      <div>
        <Image src={image} height={100} width={100} alt=""/>
      </div>
      <div>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-gray-500">Price: ${price}</p>
      </div>
    </li>
  )
}

export default MenuCard