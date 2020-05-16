//document.getElementById('test-button').addEventListener('click', function () {
//    const links = document.querySelectorAll('.titles a');
//    console.log('links:', links);
//});
{
  const titleClickHandler = function (event) {
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    console.log('clickedElement (with plus): ' + clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
//  const generateTitleLinks = function() {
  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* for each article */
//    const articles = document.querySelectorAll(optArticleSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);
      /* find the title element */

      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;

      //titleList.innerHTML = titleList.innerHTML + linkHTML;

    }
    titleList.innerHTML = html;
    console.log(html);

    const links = document.querySelectorAll('.titles a');
    console.log('Links:', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();
    
  function calculateTagsParams(tags){
    const params = {max:0, min:999999};
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

    //TAGS//
  function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    console.log(allTags);
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
    for (let article of articles) {
    /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      titleList.innerHTML = '';    
    /* make html variable with empty string */
      let html = '';
    /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
        
    /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray); 
        
    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);
      /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' +  tag + '</span></a></li>';
        console.log(linkHTML);
      /* add generated code to html variable */
        html = html + linkHTML;
       /* [NEW] check if this link is NOT already in allTags */
       if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        // allTags.push(linkHTML);
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }  else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
    /* END LOOP: for every article: */
      }
    
    /* [NEW] find list of tags in right column */
      const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
      // tagList.innerHTML = allTags.join(' ');
      console.log(allTags);
      
      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams:', tagsParams);
      /* [NEW] create variable for all links HTML code */
      let allTagsHTML = '';

      /* [NEW] START LOOP: for each tag in allTags: */
      for(let tag in allTags){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = allTagsHTML;
  }    
 
  generateTags(); 
    
  const tagClickHandler = function(event){
    console.log('Link was clicked!');
    console.log(event);
  /* prevent default action for this event */
    event.preventDefault();
      
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
      
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);  
      
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(activeLinks);
      
  /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {  
    /* remove class active */
      activeLink.classList.remove('active'); 
  /* END LOOP: for each active tag link */
    }
      
  /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(href);
    console.log(tagLinks);  
      
  /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
    /* add class active */
      tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
    } 
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]'); 
  };

    
  function addClickListenersToTags(){
  /* find all links to tags */
    const activeLinks = document.querySelectorAll('.post-tags .list a');
  /* START LOOP: for each link */
    for (let link of activeLinks) {
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      console.log(link);
  /* END LOOP: for each link */
    }
  }
  addClickListenersToTags(); 
    
    //AUTORS//
    
  function generateAuthors () {
     /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) { 
        /* find author wrapper */
      const author = article.querySelector(optArticleAuthorSelector);
      console.log(author);
      author .innerHTML = '';
      /* make html variable with empty string */
      let html = ''; 
      /* get authors from data-author attribute */
      const articleAuthor = author.getAttribute('data-author');
      console.log(articleAuthor);   
       /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
      console.log(linkHTML);
      /* insert link into author */
      html = html + linkHTML;
      console.log(html);    
      author.innerHTML = html;  
      console.log(html); 
      /* END LOOP: for every article: */
    }  
  }
  
  generateAuthors ();
  
  
  const authorClickHandler = function(event) {
    console.log('Link was clicked!');
    console.log(event);
  /* prevent default action for this event */
    event.preventDefault();
      
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
      
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);  
      
  /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#', '');
  /* find all author links with class active */
    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(activeLinks);
      
  /* START LOOP: for each active author link */
    for (let activeLink of activeLinks) {  
    /* remove class active */
      activeLink.classList.remove('active'); 
  /* END LOOP: for each active tag link */
    }
      
  /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(href);
    console.log(tagLinks);  
      
  /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
    /* add class active */
      authorLink.classList.add('active');
      console.log(authorLink);
  /* END LOOP: for each found tag link */
    } 
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-authors="' + author + '"]'); 
  };    
    
   function  addClickListenersToAuthors() {
      /* find all links to tags */
    const activeLinks = document.querySelectorAll('.post-author');
    /* START LOOP: for each link */
      for (let link of activeLinks) {
      /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', authorClickHandler);
        console.log(link);
    /* END LOOP: for each link */
      }
   }
   addClickListenersToAuthors();
   
   
}


