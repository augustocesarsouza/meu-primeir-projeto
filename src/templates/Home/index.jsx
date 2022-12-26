import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
    
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(2)
  const [searchValue, setSearchValue] = useState('')
  
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    })
    : posts;

    //lidar com postes de carga
    const handleLoadPosts = useCallback(async (page, postsPerPage) => { 
                          
    const postsAndPhotos = await loadPosts() 

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage])

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

export default Home;