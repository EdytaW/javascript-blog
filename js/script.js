//document.getElementById('test-button').addEventListener('click', function () {
//    const links = document.querySelectorAll('.titles a');
//    console.log('links:', links);
//});
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
  }

  const titleClickHandler = function (event){
  
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix ='tag-size-';
  const optAuthorsListSelector = '.authors.list';

//  const generateTitleLinks = function() {
  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* for each article */
//    const articles = document.querySelectorAll(optArticleSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */

      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* insert link into titleList */
      html = html + linkHTML;

      //titleList.innerHTML = titleList.innerHTML + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

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
   function calculateTagClass (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return (optCloudClassPrefix + classNumber);
   } 

  function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
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
    /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
    
      /* generate HTML of the link */
        // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' +  tag + '</span></a></li>';
        const linkHTMLData = {class: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
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
      const tagsParams = calculateTagsParams(allTags);
      
      /* [NEW] create variable for all links HTML code */
      // let allTagsHTML = '';
      const allTagsData = {tags: []}; 
      
      /* [NEW] START LOOP: for each tag in allTags: */
      for(let tag in allTags){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        // const tagLinkHTML = '<li><a class=' + calculateTagClass(allTags[tag], tagsParams) + ' href="#tag-' + tag + '"><span>' +  allTags[tag] + '</span></a></li>';
        // const tagLinkHTML = '<li><a class=' + calculateTagClass(allTags[tag], tagsParams) + ' href="#tag-' + tag + '"></a></li>';
        // console.log('tagLinkHTML:', tagLinkHTML);
        // allTagsHTML += tagLinkHTML;
        const tagLinkHTML = '<li><a href="#tag=' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"' + '">' + tag + '</a></li>';
        // allTagsHTML += tagLinkHTML;
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
        
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      // tagList.innerHTML = allTagsHTML;
      tagList.innerHTML = templates.tagCloudLink(allTagsData);
      
  }    
 
  generateTags(); 
    
  const tagClickHandler = function(event){
    
  /* prevent default action for this event */
    event.preventDefault();
      
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
 
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
      
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');
    
  /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {  
    /* remove class active */
      activeLink.classList.remove('active'); 
  /* END LOOP: for each active tag link */
    }
      
  /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(href);
      
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
  /* END LOOP: for each link */
    }
  }
  addClickListenersToTags(); 
    
    //AUTORS//
    
  function generateAuthors(){
      /* find all articles */
      const articles = document.querySelectorAll(optArticleSelector);

      let html = '';
      /* START LOOP: for every article: */
      for (let article of articles) {
          /* find author wrapper */
          const author = article.querySelector(optArticleAuthorSelector);
        
          author.innerHTML = '';
          /* make html variable with empty string */

          /* get authors from data-author attribute */
          const articleAuthor = author.getAttribute('data-author');
          
          /* create HTML of the link */
          // const linkHTML = '<li><a href="#' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
          const linkHTMLData = {class: articleAuthor, title: articleAuthor};
          const linkHTML = templates.authorLink(linkHTMLData);
          
          /* insert link into author */
          html = html + linkHTML;
          
          author.innerHTML = linkHTML;
          
          /* END LOOP: for every article: */
      }
      /* [NEW] find list of authors in right column */
      const authorList = document.querySelector('.authors');

      /*[NEW] add HTML from allTagsHTML to tagList */
      // authorList.innerHTML = html;
      html.innerHTML = templates.authorCloudLink(html);
      console.log(html);
  }

  generateAuthors ();
  
  
  const authorClickHandler = function(event) {
   
  /* prevent default action for this event */
    event.preventDefault();
      
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
      
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href'); 
      
  /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#', '');
  /* find all author links with class active */
    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');
      
  /* START LOOP: for each active author link */
    for (let activeLink of activeLinks) {  
    /* remove class active */
      activeLink.classList.remove('active'); 
  /* END LOOP: for each active tag link */
    }
      
  /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(href);  
      
  /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
    /* add class active */
      authorLink.classList.add('active');
      
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
        
    /* END LOOP: for each link */
      }
   }
   addClickListenersToAuthors();
   
   
}


