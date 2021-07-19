# Introduction

Deploy Now is a static site hosting platform dedicated to developers.
Connect your GitHub account and instantly deploy your static web
projects on IONOS own DDoS-protected, georedundant and green
infrastructure.

## Getting started

<iframe width="560" height="315" style="margin-bottom: 50px;" src="https://www.youtube.com/embed/wpELzwYFxQw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

1. **Connect your GitHub account.** We ask you for the permission to install the [IONOS Deploy Now App](https://github.com/apps/ionos-deploy-now) to your repositories.  
    
2. **Select your deployment source.** We can deploy either repositories within your GitHub account or any public third party repository. No repository at hand? Deploy one of our samples [Link to "samples"]. 
  
![Screenshot from source selection step](/source-selection.jpg)  
  
3. **Configure the deployment.** Deploy Now scans your repository for the framework and the dist folder you use. In case we are not able to identify these, we ask you to provide them explicitly. 

![Screenshot from configuration screen](/confirm-configuration.jpg)

4. **Your project is beeing build.** After a couple of seconds your website goes live under a preview URL. 

![Screenshot from project details](/project-details.jpg)

5. **Git commits code changes and Deploy Now updates your site.** You can now open [staging deployments](/guide/#staging-deployments) or connect a [custom domain](/advanced/custom-domains+ssl.html).

## GitHub integration

![Deploy Now git integration](/git-integration.svg)

A Deploy Now subscription allows you to deploy public or private projects from one GitHub account. This can be either a personal account or an organization owner. Deploy Now updates your website after every git commit using the [GitHub Actions](https://github.com/features/actions) pipeline. The pipeline updates are handled by the IONOS Deploy Now App that is installed to your deployment repositories. The App requires read access to actions and metadata as well as write access to administration, secrets, code and workflows. The information necessary for the usage of the pipeline are stored in a [configuration yaml](/advanced/#configuration) in your repository. Sensitive data is stored in [encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets). Deploy Now does not limit the build minutes you can use to update your website. However, the number of minutes for private repositories depend on the GitHub plan you use.

## Supported frameworks and technologies

### HTML, CSS & PHP Sites and Apps
Deploy Now allows you to host static websites based on HTML and CSS. In addition, you can run PHP scripts on our infrastructure. A sample for a PHP project can be found [here](/guide/samples.html#hello-jekyll-html). Deploy Now projects are served from Apache webservers. 

### Static Site Generators
If you are working with static site generators, Deploy Now allows you to move static files to our infrastructure after every build based on the [GitHub Actions](https://github.com/features/actions) pipeline. If you setup the build pipeline manually, all existing static site generatos can be used. Out of the box, Deploy Now supports the following static site generators:  

- [Gridsome](/guide/samples.html#hello-gridsome-html)
- [Gatsby](/guide/samples.html#hello-gatsby-html)
- [Hugo](/guide/samples.html#hello-hugo-html)
- [Jigsaw](/guide/samples.html#hello-jigsaw-html)
- [Jekyll](/guide/samples.html#hello-jekyll-html)
- [Next](/guide/samples.html#hello-next-html)
- [Nuxt](/guide/samples.html#hello-nuxt-html)
- [Vuepress](/guide/samples.html#hello-vuepress-html)
- Eleventy
- Hexo
- Metalsmith


### Single Page Applications
You can deploy Single Page Applications based on frameworks like React, Vue and Angular.

### Not supported
Our hosting infastructure uses Apache webservers only. Thus, server-side rendering with Node.js is not supported. Besides, Deploy Now does not support databases. If you are missing one of these or any other technology, you can let us know by requesting a feature via the product dashboard.

## Staging Deployments
  
![Screenshot from staging deployment section](/staging.jpg)
  
With staging deployments you can preview changes before they go live. If you think of your *main* branch as production, this is most likely the branch you select for your production deployment. droduction deployments can be connected to domains to serve content to visitors. When working on new features, you might not want unfinished code to go live on production. We suggest you to open feature branches for testing purposes and set them up as staging deployments. We equip staging deployments with preview URLs you can use to view changes by yourself or to share them with colleagues or customers. Once your happy with your changes, you can either merge them back to *main* or define the feature branch as the new production branch.

## Domains & SSL
  
By default, every deployment goes live under a preview URL. You can replace the URLs of your production deployments by custom domains. These can be either [domains purchased at IONOS](https://www.ionos.com/domains/domain-names) our domains migrated to us. For domain migration, it is required that you have at least one existing domain contract at IONOS and that you use the IONOS nameservers. A domain migration guide can be found [here](https://www.ionos.com/help/domains/set-up-and-manage-an-external-domain-at-11-ionos/setting-up-an-external-domain-at-11-ionos/).
All deployments are automatically secured by [Digicert](https://www.digicert.com/) SSL certificates without the requirement of doing any further setups. 