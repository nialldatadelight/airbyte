"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[3169],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return f}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(r),f=o,m=p["".concat(s,".").concat(f)]||p[f]||d[f]||i;return r?n.createElement(m,a(a({ref:t},c),{},{components:r})):n.createElement(m,a({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},38599:function(e,t,r){r.r(t),r.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return d}});var n=r(87462),o=r(63366),i=(r(67294),r(3905)),a=["components"],l={},s="Operations",u={unversionedId:"understanding-airbyte/operations",id:"understanding-airbyte/operations",title:"Operations",description:"Airbyte connections support configuring additional transformations that execute after the sync. Useful applications could be:",source:"@site/../docs/understanding-airbyte/operations.md",sourceDirName:"understanding-airbyte",slug:"/understanding-airbyte/operations",permalink:"/understanding-airbyte/operations",editUrl:"https://github.com/airbytehq/airbyte/blob/master/docs/../docs/understanding-airbyte/operations.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Incremental Sync - Deduped History",permalink:"/understanding-airbyte/connections/incremental-deduped-history"},next:{title:"Architecture overview",permalink:"/understanding-airbyte/high-level-view"}},c={},d=[{value:"Supported Operations",id:"supported-operations",level:2},{value:"dbt transformations",id:"dbt-transformations",level:3},{value:"- git repository url:",id:"--git-repository-url",level:4},{value:"- git repository branch (optional):",id:"--git-repository-branch-optional",level:4},{value:"- docker image:",id:"--docker-image",level:4},{value:"- dbt cli arguments",id:"--dbt-cli-arguments",level:4},{value:"Future Operations",id:"future-operations",level:2},{value:"Going Further",id:"going-further",level:2}],p={toc:d};function f(e){var t=e.components,r=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"operations"},"Operations"),(0,i.kt)("p",null,"Airbyte ",(0,i.kt)("a",{parentName:"p",href:"connections/"},"connections")," support configuring additional transformations that execute after the sync. Useful applications could be:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Customized normalization to better fit the requirements of your own business context."),(0,i.kt)("li",{parentName:"ul"},"Business transformations from a technical data representation into a more logical and business oriented data structure. This can facilitate usage by end-users, non-technical operators, and executives looking to generate Business Intelligence dashboards and reports."),(0,i.kt)("li",{parentName:"ul"},"Data Quality, performance optimization, alerting and monitoring, etc."),(0,i.kt)("li",{parentName:"ul"},"Integration with other tools from your data stack ","(","orchestration, data visualization, etc.",")")),(0,i.kt)("h2",{id:"supported-operations"},"Supported Operations"),(0,i.kt)("h3",{id:"dbt-transformations"},"dbt transformations"),(0,i.kt)("h4",{id:"--git-repository-url"},"- git repository url:"),(0,i.kt)("p",null,"A url to a git repository to ","(","shallow",")"," clone the latest dbt project code from."),(0,i.kt)("p",null,"The project versioned in the repository is expected to:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"be a valid dbt package with a ",(0,i.kt)("inlineCode",{parentName:"li"},"dbt_project.yml")," file at its root."),(0,i.kt)("li",{parentName:"ul"},"have a ",(0,i.kt)("inlineCode",{parentName:"li"},"dbt_project.yml"),' with a "profile" name declared as described ',(0,i.kt)("a",{parentName:"li",href:"https://docs.getdbt.com/dbt-cli/configure-your-profile"},"here"),".")),(0,i.kt)("p",null,"When using the dbt CLI, dbt checks your ",(0,i.kt)("inlineCode",{parentName:"p"},"profiles.yml")," file for a profile with the same name. A profile contains all the details required to connect to your data warehouse. This file generally lives outside of your dbt project to avoid sensitive credentials being checked in to version control. Therefore, a ",(0,i.kt)("inlineCode",{parentName:"p"},"profiles.yml")," will be generated according to the configured destination from the Airbyte UI."),(0,i.kt)("p",null,"Note that if you prefer to use your own ",(0,i.kt)("inlineCode",{parentName:"p"},"profiles.yml")," stored in the git repository or in the Docker image, then you can specify an override with ",(0,i.kt)("inlineCode",{parentName:"p"},"--profiles-dir=<path-to-my-profiles-yml>")," in the dbt CLI arguments."),(0,i.kt)("h4",{id:"--git-repository-branch-optional"},"- git repository branch ","(","optional",")",":"),(0,i.kt)("p",null,"The name of the branch to use when cloning the git repository. If left empty, git will use the default branch of your repository."),(0,i.kt)("h4",{id:"--docker-image"},"- docker image:"),(0,i.kt)("p",null,"A Docker image and tag to run dbt commands from. The Docker image should have ",(0,i.kt)("inlineCode",{parentName:"p"},"/bin/bash")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"dbt")," installed for this operation type to work."),(0,i.kt)("p",null,"A typical value for this field would be for example: ",(0,i.kt)("inlineCode",{parentName:"p"},"fishtownanalytics/dbt:0.19.1")," from ",(0,i.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/fishtownanalytics/dbt/tags?page=1&ordering=last_updated"},"dbt dockerhub"),"."),(0,i.kt)("p",null,"This field lets you configure the version of dbt that your custom dbt project requires and the loading of additional software and packages necessary for your transformations ","(","other than your dbt ",(0,i.kt)("inlineCode",{parentName:"p"},"packages.yml")," file",")","."),(0,i.kt)("h4",{id:"--dbt-cli-arguments"},"- dbt cli arguments"),(0,i.kt)("p",null,"This operation type is aimed at running the dbt cli."),(0,i.kt)("p",null,'A typical value for this field would be "run" and the actual command invoked would as a result be: ',(0,i.kt)("inlineCode",{parentName:"p"},"dbt run")," in the docker container."),(0,i.kt)("p",null,"One thing to consider is that dbt allows for vast configuration of the run command, for example, allowing you to select a subset of models. You can find the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.getdbt.com/reference/dbt-commands"},"dbt reference docs")," which describes this set of available commands and options."),(0,i.kt)("h2",{id:"future-operations"},"Future Operations"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Docker/Script operations: Execute a generic script in a custom Docker container."),(0,i.kt)("li",{parentName:"ul"},"Webhook operations: Trigger API or hooks from other providers."),(0,i.kt)("li",{parentName:"ul"},"Airflow operations: To use a specialized orchestration tool that lets you schedule and manage more advanced/complex sequences of operations in your sync workflow.")),(0,i.kt)("h2",{id:"going-further"},"Going Further"),(0,i.kt)("p",null,"In the meantime, please feel free to react, comment, and share your thoughts/use cases with us. We would be glad to hear your feedback and ideas as they will help shape the next set of features and our roadmap for the future. You can head to our GitHub and participate in the corresponding issue or discussions. Thank you!"))}f.isMDXComponent=!0}}]);