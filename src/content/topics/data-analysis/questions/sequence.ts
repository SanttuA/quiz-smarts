import type { SequenceQuestion } from '../../../types'
import {
  confidenceIntervalReference,
  dataQualityReference,
  exploratoryDataAnalysisReference,
  histogramReference,
  locationMeasuresReference,
  scatterPlotReference,
} from './shared'

export const sequenceQuestions = [
  {
    id: 'data-analysis.sequence.analysis-workflow',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange a basic data analysis from question to conclusion.',
    instruction: 'Start with the purpose, then prepare and explore the evidence before answering.',
    items: [
      { id: 'question', code: 'Define the question and population' },
      { id: 'data', code: 'Identify the observations and variables needed' },
      { id: 'quality', code: 'Check and prepare the data' },
      { id: 'explore', code: 'Calculate summaries and create suitable charts' },
      { id: 'conclude', code: 'Answer the question with uncertainty and caveats' },
    ],
    correctOrder: ['question', 'data', 'quality', 'explore', 'conclude'],
    explanation:
      'A precise question determines the needed data. Quality checks precede analysis, and the evidence then supports a bounded conclusion.',
    reference: exploratoryDataAnalysisReference,
  },
  {
    id: 'data-analysis.sequence.cleaning-workflow',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange a reproducible data-cleaning workflow.',
    instruction:
      'Preserve the source, diagnose issues, apply explicit rules, and verify the result.',
    items: [
      { id: 'preserve', code: 'Preserve the original source data' },
      { id: 'inspect', code: 'Inspect types, ranges, missingness, and duplicates' },
      { id: 'rules', code: 'Define and document cleaning rules' },
      { id: 'apply', code: 'Apply the rules to create prepared data' },
      { id: 'verify', code: 'Repeat quality checks and review what changed' },
    ],
    correctOrder: ['preserve', 'inspect', 'rules', 'apply', 'verify'],
    explanation:
      'Keeping raw data intact makes the process reversible. Diagnosis informs explicit rules, and repeated checks confirm the transformations worked as intended.',
    reference: dataQualityReference,
  },
  {
    id: 'data-analysis.sequence.category-percentage',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange the steps for a category frequency and percentage table.',
    instruction:
      'Validate the category, count rows, establish the whole, and calculate percentages.',
    items: [
      { id: 'validate', code: 'Validate and standardize category labels' },
      { id: 'count', code: 'Count observations in each category' },
      { id: 'total', code: 'Count all eligible observations' },
      { id: 'percentage', code: 'Divide each category count by the eligible total' },
      { id: 'present', code: 'Present counts, percentages, and the denominator' },
    ],
    correctOrder: ['validate', 'count', 'total', 'percentage', 'present'],
    acceptedOrders: [['validate', 'total', 'count', 'percentage', 'present']],
    explanation:
      'Labels must be consistent before counting. Category counts and the eligible total may be calculated in either order, then combined into percentages.',
    reference: exploratoryDataAnalysisReference,
  },
  {
    id: 'data-analysis.sequence.calculate-mean',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange the steps for calculating and reporting a mean.',
    instruction:
      'Prepare valid values, obtain the numerator and denominator, then interpret the result.',
    items: [
      { id: 'valid', code: 'Identify the valid numeric observations' },
      { id: 'sum', code: 'Sum the observations' },
      { id: 'count', code: 'Count the observations' },
      { id: 'divide', code: 'Divide the sum by the count' },
      { id: 'report', code: 'Report the mean with units and context' },
    ],
    correctOrder: ['valid', 'sum', 'count', 'divide', 'report'],
    acceptedOrders: [['valid', 'count', 'sum', 'divide', 'report']],
    explanation:
      'The mean uses the sum as its numerator and the count as its denominator. Those two can be obtained in either order after identifying valid observations.',
    reference: locationMeasuresReference,
  },
  {
    id: 'data-analysis.sequence.calculate-median',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange the steps for finding the median of an even number of values.',
    instruction: 'Order the data before locating and combining the central pair.',
    items: [
      { id: 'validate', code: 'Identify the valid numeric observations' },
      { id: 'sort', code: 'Sort the observations from smallest to largest' },
      { id: 'middle', code: 'Locate the two middle observations' },
      { id: 'average', code: 'Average the two middle observations' },
      { id: 'report', code: 'Report the median with units and context' },
    ],
    correctOrder: ['validate', 'sort', 'middle', 'average', 'report'],
    explanation:
      'Sorting establishes position. With an even count there is no single middle observation, so the median is the mean of the central pair.',
    reference: locationMeasuresReference,
  },
  {
    id: 'data-analysis.sequence.build-histogram',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange the steps for building and reading a histogram.',
    instruction:
      'Choose the data, define numeric intervals, count, draw, and inspect the distribution.',
    items: [
      { id: 'variable', code: 'Choose one quantitative variable' },
      { id: 'bins', code: 'Divide its numeric range into bins' },
      { id: 'count', code: 'Count observations in each bin' },
      { id: 'draw', code: 'Draw bin frequencies on a shared numeric axis' },
      { id: 'inspect', code: 'Inspect center, spread, shape, and unusual values' },
    ],
    correctOrder: ['variable', 'bins', 'count', 'draw', 'inspect'],
    explanation:
      'Histogram frequencies depend on defined numeric bins. Once drawn, the full distribution should be inspected rather than reduced immediately to one statistic.',
    reference: histogramReference,
  },
  {
    id: 'data-analysis.sequence.compare-groups',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange a fair comparison of a metric across groups.',
    instruction:
      'Define a common measure, form comparable groups, calculate, inspect, and interpret.',
    items: [
      { id: 'measure', code: 'Define the measure and denominator consistently' },
      { id: 'groups', code: 'Assign eligible observations to groups' },
      { id: 'calculate', code: 'Calculate the same measure for every group' },
      { id: 'inspect', code: 'Check group sizes, distributions, and data quality' },
      { id: 'interpret', code: 'Compare magnitudes with context and caveats' },
    ],
    correctOrder: ['measure', 'groups', 'calculate', 'inspect', 'interpret'],
    explanation:
      'Comparable definitions and eligibility rules come first. Group results then need sample-size and distribution checks before differences are interpreted.',
    reference: exploratoryDataAnalysisReference,
  },
  {
    id: 'data-analysis.sequence.time-trend',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange an analysis of a weekly trend.',
    instruction:
      'Prepare time values, create consistent periods, plot, investigate, and interpret.',
    items: [
      { id: 'parse', code: 'Parse dates and sort observations by time' },
      { id: 'aggregate', code: 'Aggregate the measure into consistent weekly intervals' },
      { id: 'plot', code: 'Plot weekly values in chronological order' },
      { id: 'investigate', code: 'Investigate gaps, spikes, and changes in collection' },
      { id: 'interpret', code: 'Describe the trend with its period and limitations' },
    ],
    correctOrder: ['parse', 'aggregate', 'plot', 'investigate', 'interpret'],
    explanation:
      'Chronological, consistently sized intervals make a trend comparable. Visible changes should be checked against missing data and collection changes before interpretation.',
    reference: exploratoryDataAnalysisReference,
  },
  {
    id: 'data-analysis.sequence.relationship',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange an exploratory analysis of two quantitative variables.',
    instruction:
      'Create valid pairs, visualize them, inspect the pattern, summarize carefully, and limit the claim.',
    items: [
      { id: 'pair', code: 'Create paired observations with consistent units' },
      { id: 'plot', code: 'Draw a scatter plot' },
      { id: 'inspect', code: 'Inspect form, direction, spread, clusters, and outliers' },
      { id: 'summarize', code: 'Calculate a correlation if a linear summary is appropriate' },
      { id: 'limit', code: 'Report association without claiming causation' },
    ],
    correctOrder: ['pair', 'plot', 'inspect', 'summarize', 'limit'],
    explanation:
      'A scatter plot exposes patterns a single coefficient can hide. Correlation is useful only when its linear summary fits, and neither one proves cause.',
    reference: scatterPlotReference,
  },
  {
    id: 'data-analysis.sequence.communicate-result',
    topicId: 'data-analysis',
    kind: 'sequence',
    prompt: 'Arrange a concise, decision-ready analysis conclusion.',
    instruction:
      'Lead with the answer, support it, quantify uncertainty, and close with limits and action.',
    items: [
      { id: 'answer', code: 'State the direct answer for the defined population and period' },
      { id: 'evidence', code: 'Give the key comparison or summary that supports it' },
      { id: 'uncertainty', code: 'Describe sampling or measurement uncertainty' },
      { id: 'limits', code: 'Name important data and design limitations' },
      { id: 'action', code: 'Connect the result to a decision or next analysis' },
    ],
    correctOrder: ['answer', 'evidence', 'uncertainty', 'limits', 'action'],
    requiredOrderPairs: [
      ['answer', 'evidence'],
      ['evidence', 'uncertainty'],
      ['evidence', 'limits'],
      ['uncertainty', 'action'],
      ['limits', 'action'],
    ],
    explanation:
      'Readers need the answer and evidence first. Uncertainty and limitations may follow in either order before the practical implication or next step.',
    reference: confidenceIntervalReference,
  },
] as const satisfies readonly SequenceQuestion[]
