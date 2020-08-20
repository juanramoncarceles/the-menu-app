import Link from 'next/link';

const Menu = () => (
  <div className="container">
    <h3><Link href={{ pathname: '/catalog', query: { section: 'maincourses' } }}><a>Main Courses</a></Link></h3>
    <h3><Link href={{ pathname: '/catalog', query: { section: 'desserts' } }}><a>Desserts</a></Link></h3>
    <h3><Link href={{ pathname: '/catalog', query: { section: 'drinks' } }}><a>Drinks</a></Link></h3>

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

export default Menu;