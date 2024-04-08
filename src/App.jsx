import './App.css'
import CarbonChart from './charts/CarbonChart';


function App() {
  return (
    <>
      <h1>Energy Consumption and Carbon Footprint for a Containerized LLM Service</h1>
      <h2>The charts below present relevant parameters for the calculation of the SCI Score, in the span of an hour</h2>
      <br/><br/><br/>
      <div className='charts'>
        <div className='chart-row'>
          <CarbonChart metrics="memory/energy" title="Memory Energy"/>
          <CarbonChart metrics="network/energy" title="Network Energy"/>
        </div>
        <div className='chart-row'>
          <CarbonChart metrics="cpu/energy" title="CPU Energy"/>
          <CarbonChart metrics= "grid/carbon-intensity" title="Grid Carbon Intensity"/>
        </div>
        <div className='chart-row'>
          <CarbonChart metrics="energy" title="Energy"/>
          <CarbonChart metrics="carbon-operational" title="Carbon Operational"/>
        </div>
        <CarbonChart metrics="cpu/thermal-design-power" title ="CPU Thermal Design Power"/>
      </div>
    </>
  )
}

export default App
