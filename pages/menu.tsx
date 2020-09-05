import Link from 'next/link';
import { GetStaticProps } from 'next';
import { CategoryData } from '../types';
import LayoutWithCart from '../components/layouts/LayoutWithCart';

interface IProps {
  categories: CategoryData[];
}

const Menu = ({ categories }: IProps) => {

  return (
    <LayoutWithCart>
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
    </LayoutWithCart>
  );
};


export const getStaticProps: GetStaticProps = async (context) => {
  let categories: CategoryData[];
  try {
    const res = await fetch('http://localhost:1337/categories');
    categories = await res.json();
  } catch (error) {
    console.error(error);
    categories = [{id: '0', name: 'Test'}];
  }
  return {
    props: {
      categories
    }
  }
}


export default Menu;