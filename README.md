# Measuring & visualising the environmental impact of LLMs using the Impact Framework 🌲💻💡
* Created over an _intense_ four week period as part of the Green Software Foundation Carbon Hack 2024 (Best Contribution Award 🏆)
* Our project aims to enhance the Impact Framework by providing a visual element to complement the low-level infrastructure of the Impact Framework, in order to effectively communicate its results to a wider range of audiences.
* We are a team of developers, AI enthusiasts and story tellers who share a keen interest and passion for sustainablity and the technical solutions that can help move towards a more sustainable IT industry.
* Team made up of members of the Capgemini Insights & Data Sustainability Guild.
  
![Capgemini Logo](https://github.com/ogbk/capgemini_ch2024/blob/main/Images/Capgemini_Logo_Color-300x75.png)


## How to Use 🛠️
* The Impact Framework output is to be copied into the __output.json__ file.
* This output.json file then connects to the website we have created to update six time series charts.
* In the time we have had available to us in this hackathon we have not been able to automate the process of passing the Impact Framework plugin results to the website. This is something we will look to achieve in phase two of development!

### Website 🌐
Here is a link to the website we have created as part of our project:

➡️➡️➡️ [Environmental Measures of LLMs](https://github.com/ogbk/capgemini_ch2024/blob/main/ExampleCharts.png)

### Example Visuals 🖼️
Examples of the time series charts that our website will display:

![Example Environmental Output Line Graphs](https://github.com/ogbk/capgemini_ch2024/blob/main/Images/3ExampleCharts.png)



## Inspiration
* Following the success of ChatGPT and co. there has been a significant increase in interest in LLMs by businesses across various sectors, which is predicted to continue to grow.
* This is happening at the same time as businesses are experiencing an increase in sustainability reporting requirements 🔗 [EU Corporate Sustainability Reporting  Directive](https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en)
* There is rising concern about the vast amounts of energy that will be required to power the rise of LLMs (and AI more generally), which Sam Altman (ChatGPT creator 🤖) referenced in his recent speech as Davos 🔗 [Nuclear Fusion needed to power superhuman AI - News](https://www.independent.co.uk/tech/nuclear-fusion-ai-chatgpt-sam-altman-b2514836.html)
* We have identified a potential gap between these two trends which could be filled with a tool like the __Impact Framework.__
* Our project is inspired by the need to balance the benefits of the continued rise and development of AI (particularly LLMs) with the environmental impact of the massive amount of computing power needed.
* We hope our project will inform and educate.

## Features 📋
The website contains seven time series charts showing the below metrics over a __one hour__ time period:
* cpu/thermal-design-power
* grid/carbon-intensity
* memory/energy
* network/energy
* cpu/energy
* energy            
* carbon-operational


## The Pipeline :chains:
The project workflow:
![Flowchart 1](https://github.com/ogbk/capgemini_ch2024/blob/main/Images/PipelineImage4.png)


![Flowchart 2](https://github.com/ogbk/capgemini_ch2024/blob/main/Images/PipelineImage2.png)


![Flowchart 3](https://github.com/ogbk/capgemini_ch2024/blob/main/Images/PipelineImage3.png)


## React + Vite 🌩️

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Green Software Foundation Goals and Philosophy
Whilst creating and planning our project we wanted to ensure our contribution was aligned with the Impact Framework's Design Philosophy:
* Transparency: We used existing IF plugins as a basis of our project and took advantage of the transparent manifest file structure. Our contribution is also transparent, with all steps we have taken being freely available for all to review on this Github repo.
* Verifiability: Again, we have used the existing manifest file structure in our project to ensure our results are verifiable. We have designed the project so that numerous LLM use cases can be tested; from RAG to text generation to classification.
* Flexibility: We have tested our project on a number of different LLM use cases (as noted above) and have seven different outputs which users can review as needed for their use case. This provides flexibility in approach, whether a company is focused more on carbon or energy use.
* Modularity: The solution we have created is highly modular and scalable.
* Neutrality: The output we have created aims to inform only - not to provide any particular assessment on whether an LLM is suitable. Through the use of Prometheus, users will be able to add an alert for when any metric exceeds a certain value, but this value is not built into our solution.


## Link to Video
We have also created a demo video which provides more detail of our project on an end to end basis:

➡️➡️➡️ 


## Team Members 🧑‍💻
@JadeMCap 👩‍💻 @BaldelliMichele 👨‍💻 @chivchila 👩‍💻 @wispyplant 👩‍💻 @arun-apad 👨‍💻 @ogbk 👨‍💻 @blazarblast 👨‍💻


## Proposed Next Steps 👣
* Currently, the plugin's output is separate from the visuals. To update the website with new output, we manually replace the JSON file on the GitHub page and rerun the process.
* Future goal: Automate the process by storing the output on a server. The website will then pull from this server, making the process more automated and easier to use.


## Useful Links and References :link:

* https://github.com/Green-Software-Foundation/hack
* https://if.greensoftware.foundation/
* https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en
* https://www.independent.co.uk/tech/nuclear-fusion-ai-chatgpt-sam-altman-b2514836.html
* https://www.amd.com/system/files/documents/4th-gen-epyc-processor-architecture-white-paper.pdf
* https://carbonintensity.org.uk/

### Big shout out to the team at The Green Software Foundation for organising the hackathon that resulted in this very interesting project. Links to their sites above 🤘
