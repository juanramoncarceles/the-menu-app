import Link from 'next/link';
import { GetStaticProps } from 'next';
import { CategoryData } from '../types';

interface IProps {
  categories: CategoryData[];
}

const Menu = ({ categories }: IProps) => {

  return (
    <div className="container">

      {categories.map((category: CategoryData, i: number) => (
        <h3 key={i}><Link href={{ pathname: '/catalog', query: { id: category.id, name: category.name } }}><a>{category.name}</a></Link></h3>
      ))}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h3 {
          font-size: 10rem;
        }
      `}</style>
    </div>
  );
};


export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('http://localhost:1337/categories');
  const categories = await res.json();
  return {
    props: {
      categories
    }
  }
}


export default Menu;