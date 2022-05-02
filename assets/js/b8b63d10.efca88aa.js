"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[9017],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,h=d["".concat(l,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},10017:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return p}});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),i=["components"],s={},l="Scaling Airbyte",c={unversionedId:"operator-guides/scaling-airbyte",id:"operator-guides/scaling-airbyte",title:"Scaling Airbyte",description:"As depicted in our High-Level View, Airbyte is made up of several components under the hood: 1. Scheduler 2. Server 3. Temporal 4. Webapp 5. Database",source:"@site/../docs/operator-guides/scaling-airbyte.md",sourceDirName:"operator-guides",slug:"/operator-guides/scaling-airbyte",permalink:"/operator-guides/scaling-airbyte",editUrl:"https://github.com/airbytehq/airbyte/blob/master/docs/../docs/operator-guides/scaling-airbyte.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Using custom connectors",permalink:"/operator-guides/using-custom-connectors"},next:{title:"Securing Airbyte access",permalink:"/operator-guides/securing-airbyte"}},u={},p=[{value:"What To Scale",id:"what-to-scale",level:2},{value:"Memory",id:"memory",level:3},{value:"Disk Space",id:"disk-space",level:3},{value:"On Kubernetes",id:"on-kubernetes",level:3},{value:"Temporal DB",id:"temporal-db",level:3},{value:"Feedback",id:"feedback",level:2}],d={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"scaling-airbyte"},"Scaling Airbyte"),(0,a.kt)("p",null,"As depicted in our ",(0,a.kt)("a",{parentName:"p",href:"/understanding-airbyte/high-level-view"},"High-Level View"),", Airbyte is made up of several components under the hood: 1. Scheduler 2. Server 3. Temporal 4. Webapp 5. Database"),(0,a.kt)("p",null,"These components perform control plane operations that are low-scale, low-resource work. In addition to the work being low cost, these components are efficient and optimized for these jobs, meaning that only uncommonly large workloads will require deployments at scale. In general, you would only encounter scaling issues when running over a thousand connections."),(0,a.kt)("p",null,"As a reference point, the typical Airbyte user has 5 - 20 connectors and 10 - 100 connections configured. Almost all of these connections are scheduled, either hourly or daily, resulting in at most 100 concurrent jobs."),(0,a.kt)("h2",{id:"what-to-scale"},"What To Scale"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/understanding-airbyte/jobs"},"Workers")," do all the heavy lifting within Airbyte. A worker is responsible for executing Airbyte operations ","(","e.g. Discover, Read, Sync etc",")",", and is created on demand whenever these operations are requested. Thus, every job has a corresponding worker executing its work."),(0,a.kt)("p",null,"How a worker executes work depends on the Airbyte deployment. In the Docker deployment, an Airbyte worker spins up at least one Docker container. In the Kubernetes deployment, an Airbyte worker will create at least one Kubernetes pod. The created resource ","(","Docker container or Kubernetes pod",")"," does all the actual work."),(0,a.kt)("p",null,"Thus, scaling Airbyte is a matter of ensuring that the Docker container or Kubernetes Pod running the jobs has sufficient resources to execute its work."),(0,a.kt)("p",null,"Jobs-wise, we are mainly concerned with Sync jobs when thinking about scale. Sync jobs sync data from sources to destinations and are the majority of jobs run. Sync jobs use two workers. One worker reads from the source; the other worker writes to the destination."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"In general, we recommend starting out with a mid-sized cloud instance ","(","e.g. 4 or 8 cores",")"," and gradually tuning instance size to your workload.")),(0,a.kt)("p",null,"There are two resources to be aware of when thinking of scale: 1. Memory 2. Disk space"),(0,a.kt)("h3",{id:"memory"},"Memory"),(0,a.kt)("p",null,"As mentioned above, we are mainly concerned with scaling Sync jobs. Within a Sync job, the main memory culprit is the Source worker."),(0,a.kt)("p",null,"This is because the Source worker reads up to 10,000 records in memory. This can present problems for database sources with tables that have large row sizes. e.g. a table with an average row size of 0.5MBs will require 0.5 ","*"," 10000 / 1000 = 5GBs of RAM. See ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/airbytehq/airbyte/issues/3439"},"this issue")," for more information."),(0,a.kt)("p",null,"Our Java connectors currently follow Java's default behaviour with container memory and will only use up to 1/4 of the host's allocated memory. e.g. On a Docker agent with 8GBs of RAM configured, a Java connector limits itself to 2Gbs of RAM and will see Out-of-Memory exceptions if this goes higher. The same applies to Kubernetes pods.\nYou may want to customize this by setting ",(0,a.kt)("inlineCode",{parentName:"p"},"JOB_MAIN_CONTAINER_MEMORY_REQUEST")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"JOB_MAIN_CONTAINER_MEMORY_LIMIT")," environment variables to custom values."),(0,a.kt)("p",null,"Note that all Source database connectors are Java connectors. This means that users currently need to over-specify memory resource for Java connectors."),(0,a.kt)("h3",{id:"disk-space"},"Disk Space"),(0,a.kt)("p",null,"Airbyte uses backpressure to try to read the minimal amount of logs required. In the past, disk space was a large concern, but we've since deprecated the expensive on-disk queue approach."),(0,a.kt)("p",null,"However, disk space might become an issue for the following reasons:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Long-running syncs can produce a fair amount of logs from the Docker agent and Airbyte on Docker deployments. Some work has been done to minimize accidental logging, so this should no longer be an acute problem, but is still an open issue."),(0,a.kt)("li",{parentName:"ol"},"Although Airbyte connector images aren't massive, they aren't exactly small either. The typical connector image is ~300MB. An Airbyte deployment with multiple connectors can easily use up to 10GBs of disk space.")),(0,a.kt)("p",null,"Because of this, we recommend allocating a minimum of 30GBs of disk space per node. Since storage is on the cheaper side, we'd recommend you be safe than sorry, so err on the side of over-provisioning."),(0,a.kt)("h3",{id:"on-kubernetes"},"On Kubernetes"),(0,a.kt)("p",null,"Users running Airbyte Kubernetes also have to make sure the Kubernetes cluster can accommodate the number of pods Airbyte creates."),(0,a.kt)("p",null,"To be safe, make sure the Kubernetes cluster can schedule up to ",(0,a.kt)("inlineCode",{parentName:"p"},"2 x <number-of-possible-concurrent-connections>")," pods at once. This is the worse case estimate, and most users should be fine with ",(0,a.kt)("inlineCode",{parentName:"p"},"2 x <number-of-possible-concurrent-connections>")," as a rule of thumb."),(0,a.kt)("p",null,"This is a ",(0,a.kt)("strong",{parentName:"p"},"non-issue")," for users running Airbyte Docker."),(0,a.kt)("h3",{id:"temporal-db"},"Temporal DB"),(0,a.kt)("p",null,"Temporal maintains multiple idle connections. By the default value is ",(0,a.kt)("inlineCode",{parentName:"p"},"20")," and you may want to lower or increase this number. One issue we noticed is\nthat temporal creates multiple pools and the number specified in the ",(0,a.kt)("inlineCode",{parentName:"p"},"SQL_MAX_IDLE_CONNS")," environment variable of the ",(0,a.kt)("inlineCode",{parentName:"p"},"docker.compose.yaml")," file\nmight end up allowing 4-5 times more connections than expected."),(0,a.kt)("p",null,"If you want to increase the amount of allowed idle connexion, you will also need to increase ",(0,a.kt)("inlineCode",{parentName:"p"},"SQL_MAX_CONNS")," as well because ",(0,a.kt)("inlineCode",{parentName:"p"},"SQL_MAX_IDLE_CONNS"),"\nis capped by ",(0,a.kt)("inlineCode",{parentName:"p"},"SQL_MAX_CONNS"),"."),(0,a.kt)("h2",{id:"feedback"},"Feedback"),(0,a.kt)("p",null,"The advice here is best-effort and by no means comprehensive. Please reach out on Slack if anything doesn't make sense or if something can be improved."),(0,a.kt)("p",null,"If you've been running Airbyte in production and have more tips up your sleeve, we welcome contributions!"))}m.isMDXComponent=!0}}]);