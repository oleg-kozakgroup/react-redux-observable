import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateMetric } from '../actions';
import { Emitter } from '../emitters';
import { wrapper, header, list, preloader } from './AnalitycsDashboard.module.css';
import spinner from '../assets/spinner.svg'

class AnalyticsDashboard extends Component {

  get list() {
    const { temperature, humidity, pressure } = this.props;
    return (
      <ul className={list}>
        <li><span>Temperature</span><span>{temperature}</span></li>
        <li><span>Humidity</span><span>{humidity}</span></li>
        <li><span>Pressure</span><span>{pressure}</span></li>
      </ul>
    )
  }

  get loading() {
    return <div className={preloader}><img alt="spinner" src={spinner} /></div>;
  }

  render() {
    const { temperature } = this.props;
    return (
      <div className={wrapper}>
        <h1 className={header}>Metrics</h1>
        { temperature ? this.list : this.loading }
      </div>
    )
  }

  componentWillMount() {
    const { updateMetric } = this.props;
    this.temperatureEmitter = new Emitter('temperature');
    this.humidityEmitter = new Emitter('humidity');
    this.pressureEmitter = new Emitter('pressure');
    this.temperatureEmitter.on('data', updateMetric);
    this.humidityEmitter.on('data', updateMetric);
    this.pressureEmitter.on('data', updateMetric);
  }

  componentWillUnmount() {
    const { updateMetric } = this.props;
    this.temperatureEmitter.removeListener(updateMetric);
    this.humidityEmitter.removeListener(updateMetric);
    this.pressureEmitter.removeListener(updateMetric);
  }
}

AnalyticsDashboard.propTypes = {
  temperature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  humidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pressure: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updateMetric: PropTypes.func
};

const mapStateToProps = ({ displayMetrics }) => ({ ...displayMetrics });

const mapDispatchToProps = (dispatch) => ({
  updateMetric(val) {
    dispatch(updateMetric(val))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboard)
