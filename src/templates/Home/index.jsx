import { useEffect, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 10,
  //   searchValue: ''
  // };

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    })
    : posts;

    //lidar com postes de carga
    const handleLoadPosts = async () => { 
                          
    const postsAndPhotos = await loadPosts() 

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }

  useEffect(() => {
    // console.log("Oi")
    handleLoadPosts();
  }, [])

  // carregar mais postagem
  const loadMorePost = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    
    setPosts(posts)
    setPage(nextPage)
  }
  // lidar com mudança
  const handleChange = (e) => {
    const {value} = e.target
    
    setSearchValue(value)
  }

  return (
    <section className="container">
      <div className='search-container'>
        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange}/>
      </div>

      {filteredPosts.length > 0 && (
       <Posts posts={filteredPosts}/>
      )}

      {filteredPosts.length === 0 && (
       <p>Não existem posts =(</p>
      )}
      
      <div className='button-container'>
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePost}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}

// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: ''
//   };
  
//   async componentDidMount() {
//     await this.loadPosts()
//   }
  
//   loadPosts = async () => { 
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts()
//     this.setState({ 
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,

//     })
//   }

//   // carregar mais postagem
//   loadMorePost = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state
//     const nextPage = page + postsPerPage
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
//     posts.push(...nextPosts)
    
//     this.setState({ posts, page: nextPage })
//   }
//   // lidar com mudança
//   handleChange = (e) => {
//     const {value} = e.target
//     this.setState({searchValue: value})
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue ? 
//     allPosts.filter(post => {
//       return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
//     })
//     : posts;

//     return (
//       <section className="container">
//         <div className='search-container'>
//           {!!searchValue && (
//             <h1>Search Value: {searchValue}</h1>
//           )}
//           <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
//         </div>

//         {filteredPosts.length > 0 && (
//          <Posts posts={filteredPosts}/>
//         )}

//         {filteredPosts.length === 0 && (
//          <p>Não existem posts =(</p>
//         )}
        
//         <div className='button-container'>
//           {!searchValue && (
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePost}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Olá mundo
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
