import React, { useEffect, useState } from 'react'
import JobComp from './JobComp';
import axios from 'axios';

let url = 'https://hacker-news.firebaseio.com/v0/jobstories.json'

let obj = {
    "by": "jamilbk",
    "id": 35908337,
    "score": 1,
    "time": 1683838872,
    "title": "Firezone (YC W22) is hiring Elixir and Rust engineers",
    "type": "job",
    "url": "https://www.ycombinator.com/companies/firezone/jobs"
  }

const Jobboard = () => {
    const [arr, setArr] = useState([]);
    const [ids, setIds] = useState([]);
    const [page, setPage] = useState(0)

    useEffect(()=>{
        async function fetchData1(){
            let response = await axios.get(url);
            setIds(response.data)
        } 
        fetchData1();
    },[])



    //   async function fetchData2(){
    //     let items = await Promise.all(ids.slice(0,6).map(async (ele)=>{
    //         return await axios.get(`https://hacker-news.firebaseio.com/v0/item/${ele}.json`)
    //     }));
    
    //     // setArr(items.map(item => item.data));
    //     setArr(()=>[...arr, ...(items.map(ele=>ele.data))])
    //     console.log(items)
    //    }

    useEffect(() => {
        async function fetchData2() {
          try {
            const items = await Promise.all(
              ids.slice(page * 6, (page + 1) * 6).map(async (id) => {
                const response = await axios.get(
                  `https://hacker-news.firebaseio.com/v0/item/${id}.json`
                );
                return response.data;
              })
            );
    
            setArr((prevArr) => [...prevArr, ...items]);
            console.log(items);
          } catch (error) {
            console.error('Error fetching items:', error);
          }
        }
    
        fetchData2();
      }, [ids, page]);
    
      function loadMore() {
        setPage((prevPage) => prevPage + 1);
      }
  
    
  return (
    <div>
        <h1>Job Board</h1>
        <div>
            {
                arr.length<1 ? <p>Loading......</p> : 
                arr.map((ele)=>(
                    <JobComp key={ele.id} {...ele}/>
                ))
            }
        </div>
        <button onClick={loadMore}>Load more</button>
    </div>
  )
}

export default Jobboard