import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import EntityDesigner from './components/entityComponents/EntityDesigner'
import FormDesigner from './components/formComponents/FormDesigner'
import WorkflowDesigner from './components/workflowComponents/WorkflowDesigner'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/entityDesigner' component={EntityDesigner}/>
      <Route path='/formDesigner' component={FormDesigner}/>
      <Route path='/workflowDesigner' component={WorkflowDesigner} />
    </Switch>
  </main>
)

export default Main