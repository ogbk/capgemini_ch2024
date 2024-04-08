import './App.css'
import CarbonChart from './charts/CarbonChart';
import outputs from '../output.json';
import { calculateAverages } from './services/calculateAverages';

function App() {
  return (
    <>
      <h1>Energy Consumption and Carbon Footprint for a Containerized LLM Service</h1>
      <h2>The charts below present relevant parameters for the calculation of the SCI Score, in the span of an hour</h2>
      <br/><br/><br/>
      <div className='charts'>
        <div className='chart-row'>
          <CarbonChart metrics="memory/energy" title="Memory Energy" yAxeName="[kWh]"/>
          <div>Energy consumed by the Memory during the deployment of the LLM Service
            <br/><b>Average:</b> {calculateAverages(outputs, 'memory/energy')} [kWh]
          </div>
          
        </div>
        <div className='chart-row'>
          <CarbonChart metrics="network/energy" title="Network Energy" yAxeName="[kWh]"/>
          <div>Energy consumed by the Network during the deployment of the LLM Service
            <br/><b>Average:</b> {calculateAverages(outputs, 'network/energy', 10)} [kWh]
          </div>
        </div>
        <div className='chart-row'>
          <CarbonChart metrics="cpu/energy" title="CPU Energy" yAxeName="[kWh]"/>
          <div>Energy consumed by the CPU during the deployment of the LLM Service< br />
          Reference: <a href="https://www.amd.com/system/files/documents/4th-gen-epyc-processor-architecture-white-paper.pdf">Thermal Design Power</a>
          <br/><b>Average:</b> {calculateAverages(outputs, 'cpu/energy')} [kWh]</div>
        </div>
        <div className='chart-row'>
          <CarbonChart metrics="energy" title="Total Energy" yAxeName="[kWh]"/>
          <div>Total Energy = Memory Energy + Network Energy + CPU Energy, 
            <br />represents the total amount of energy consumed by the LLM Service
            <br/><b>Average:</b> {calculateAverages(outputs, 'energy')} [kWh]</div>
        </div>
        <div className='chart-row'>
          <CarbonChart metrics="carbon-operational" title="Carbon Operational" yAxeName="[gCO2eq]"/>
          <div>Carbon Operational = Total Energy * Grid Carbon Intensity, where Grid Carbon Intensity is a measure <br/>of how much carbon (gCO2eq) emissions are produced per kilowatt-hour (kWh) of electricity consumed.
            <br />
            In this case, it is a fixed value: 81.57 [gCO2eq/kWh] <br />
            Reference: <a href="https://carbonintensity.org.uk/">Grid Intensity</a>
            <br/><b>Average:</b> {calculateAverages(outputs, 'carbon-operational')} [gCO2eq]
          </div>          
        </div>
        <div className='chart-row'>
          <CarbonChart metrics="sci" title="SCI Score" yAxeName="[gCOseq]"/>
          <div>SCI Score = Carbon Operational + Carbon Embodied,
            <br/>where Carbon Embodied is a fraction of the total embodied emissions emitted 
            <br/>during the creation and disposal of a hardware device
            <br/>In this case, it is a fixed value: 157.325 [gCO2eq]
            <br />
            Reference: <a href="https://docs.google.com/spreadsheets/d/1k-6JtneEu4E9pXQ9QMCXAfyntNJl8MnV2YzO4aKHh-0/edit?pli=1#gid=0">Embodied Emissions</a>
            <br/><b>Average:</b> {calculateAverages(outputs, 'sci')} [gCO2eq]
          </div>          
        </div>
      </div>
    </>
  )
}

export default App
