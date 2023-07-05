import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


function News(props) {
  const [articles, setarticles] = useState([]);
    const [page, setpage] = useState(1);
    const [loading,setloading] = useState(false);
    const [totalresult,settotalresult] = useState(0);
    

    useEffect(()=>{
      unpdatenews();

      // eslint-disable-next-line
    },[])
    
    const unpdatenews = async ()=>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
      setloading(true);
      props.setProgress(30);
      let data = await fetch(url);
      props.setProgress(70);
      let parseddata = await data.json();
      setarticles(parseddata.articles);
      settotalresult(parseddata.totalResults);
      
      setloading(false);
      props.setProgress(100);
      
    }

    // const Prevhandler = async ()=>{
    //   setpage(page - 1);
    //   unpdatenews();
    // }

    // const nexthandler = async () => {
    //   setpage(page + 1);
      
    //   unpdatenews();
    // };
    const captial = (word)=>{
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    document.title = `DailyBriefing-${captial(props.category)}`;
    const fetchMoreData = async () => {
      
      const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pagesize}`;
      setpage(page + 1);
      
      let data = await fetch(url);
      let parsedData = await data.json();
      setarticles(articles.concat(parsedData.articles));
      settotalresult(parsedData.totalResults);
    };

  return (
    <>
      <div className={`bg-${props.mode === "dark" ? "secondary" : "light"}`}>
        <h1
          className={`text-center bg-${
            props.mode === "dark" ? "secondary" : "light"
          } text-${props.mode === "light" ? "dark" : "light"}`}
          style={{ marginTop: "50px", marginBottom: "auto", padding: "17px" }}
        >
          DailyBriefing - Top {captial(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalresult}
          loader={<Spinner />}
        >
          <div className="container ">
            <div className="row">
              {!loading &&
                articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItems
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        mode = {props.mode}
                        image={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://th.bing.com/th/id/OIP.LX6tdi8Zc5aR1hdTZ09dXgHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        }
                        newsurl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        name={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          onClick={Prevhandler}
          type="button"
          className="btn btn-dark"
        >
          &larr; Prev
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalresult / props.pagesize)}
          onClick={nexthandler}
          type="button"
          className="btn btn-dark"
        >
          Next &rarr;
        </button>
      </div> */}
      </div>
    </>
  );
}

News.defaultProps = {
  country: 'in',
  pagesize: 8,
  category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
