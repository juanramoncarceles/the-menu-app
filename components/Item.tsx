interface IProps {
  title: string;
  image?: string;
  price: number;
}

const Item = ({title, image = '', price}: IProps) => {
  return (
    <div className="root">
      <img src={image} />
      <h4>{title}</h4>
      <p>{price}</p>

      <style jsx>{`
        .root {
          height: 200px;
          background-color: #ccbfbf;
        }
      `}</style>
    </div>
  );
}

export default Item;