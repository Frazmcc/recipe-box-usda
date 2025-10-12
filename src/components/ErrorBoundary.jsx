import { Component } from "react";
export default class ErrorBoundary extends Component {
  constructor(p){ super(p); this.state={hasError:false, err:null}; }
  static getDerivedStateFromError(e){ return {hasError:true, err:e}; }
  componentDidCatch(e, info){ console.error("ErrorBoundary:", e, info); }
  render(){
    if(this.state.hasError){
      return <div style={{padding:24}}><h2>Something went wrong.</h2><pre>{String(this.state.err)}</pre></div>;
    }
    return this.props.children;
  }
}