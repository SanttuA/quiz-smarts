import type { MultipleChoiceQuestion } from '../../../types'
import {
  dataQualityReference,
  exploratoryDataAnalysisReference,
  histogramReference,
  locationMeasuresReference,
  scatterPlotReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'data-analysis.mcq.observation',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt: 'A table has one row for each customer order. What does one row represent?',
    instruction: 'Choose the role of a row in this dataset.',
    choices: [
      { id: 'observation', label: 'One observation' },
      { id: 'variable', label: 'One variable' },
      { id: 'population', label: 'The entire population' },
      { id: 'summary', label: 'A summary statistic' },
    ],
    correctChoiceId: 'observation',
    explanation:
      'Each row describes one observed unit—here, one order—while the columns hold variables measured for that order.',
    reference: exploratoryDataAnalysisReference,
  },
  {
    id: 'data-analysis.mcq.quantitative-variable',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt: 'Which variable is quantitative rather than categorical?',
    instruction: 'Choose the variable whose numeric differences represent amounts.',
    choices: [
      { id: 'minutes', label: 'Delivery time in minutes' },
      { id: 'region', label: 'Delivery region' },
      { id: 'priority', label: 'Priority label: low, medium, or high' },
      { id: 'carrier', label: 'Carrier name' },
    ],
    correctChoiceId: 'minutes',
    explanation:
      'Delivery time measures a numeric amount, so differences and summaries such as a mean are meaningful. The other variables identify categories.',
    reference: exploratoryDataAnalysisReference,
  },
  {
    id: 'data-analysis.mcq.missing-values',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt:
      'Some survey respondents did not provide their age. What should the first analysis step be?',
    instruction: 'Choose the safest initial treatment of missing values.',
    choices: [
      { id: 'inspect', label: 'Measure and inspect the missing ages before choosing a treatment' },
      { id: 'zero', label: 'Replace every missing age with zero' },
      { id: 'mean', label: 'Replace every missing age with the overall mean immediately' },
      { id: 'drop', label: 'Delete every row containing any missing value' },
    ],
    correctChoiceId: 'inspect',
    explanation:
      'The amount and pattern of missingness can affect conclusions. Inspect it first, then document a treatment appropriate to why values are missing.',
    reference: dataQualityReference,
  },
  {
    id: 'data-analysis.mcq.duplicate-key',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt: 'Why define a unique record key before removing duplicate rows?',
    instruction: 'Choose the reason a key is needed.',
    choices: [
      {
        id: 'distinguish',
        label: 'It distinguishes accidental copies from legitimate repeated events',
      },
      { id: 'sort', label: 'It guarantees that every numeric column is sorted' },
      { id: 'fill', label: 'It fills all missing values automatically' },
      { id: 'average', label: 'It makes the mean equal to the median' },
    ],
    correctChoiceId: 'distinguish',
    explanation:
      'Identical-looking events can both be real. A business key defines what makes one observation unique before any record is removed.',
    reference: dataQualityReference,
  },
  {
    id: 'data-analysis.mcq.outlier-center',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt:
      'For response times 18, 20, 21, 22, and 300 seconds, which center best represents a typical response?',
    instruction: 'Choose the summary least distorted by the extreme value.',
    choices: [
      { id: 'median', label: 'Median' },
      { id: 'mean', label: 'Mean' },
      { id: 'range', label: 'Range' },
      { id: 'maximum', label: 'Maximum' },
    ],
    correctChoiceId: 'median',
    explanation:
      'The median is 21 seconds and remains near most observations. The 300-second value pulls the mean upward, while range and maximum do not measure center.',
    reference: locationMeasuresReference,
  },
  {
    id: 'data-analysis.mcq.percentage-points',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt: 'A completion rate rises from 30% to 45%. What is the absolute increase?',
    instruction: 'Choose the percentage-point difference.',
    choices: [
      { id: 'fifteen', label: '15 percentage points' },
      { id: 'fifty', label: '50 percentage points' },
      { id: 'one-point-five', label: '1.5 percentage points' },
      { id: 'seventy-five', label: '75 percentage points' },
    ],
    correctChoiceId: 'fifteen',
    explanation:
      'Subtracting 30% from 45% gives an absolute increase of 15 percentage points. The relative increase is 50%, which answers a different question.',
    reference: exploratoryDataAnalysisReference,
  },
  {
    id: 'data-analysis.mcq.category-chart',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt: 'Which chart best compares the number of tickets in four priority categories?',
    instruction: 'Choose the clearest chart for discrete category counts.',
    choices: [
      { id: 'bar', label: 'Bar chart' },
      { id: 'histogram', label: 'Histogram' },
      { id: 'scatter', label: 'Scatter plot' },
      { id: 'line', label: 'Line chart with an arbitrary category order' },
    ],
    correctChoiceId: 'bar',
    explanation:
      'A bar chart uses separate bars to compare values across discrete categories. A histogram instead groups a quantitative variable into numeric bins.',
    reference: histogramReference,
  },
  {
    id: 'data-analysis.mcq.histogram-purpose',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt: 'What does a histogram primarily reveal about one quantitative variable?',
    instruction: 'Choose the purpose of grouping numeric values into bins.',
    choices: [
      { id: 'distribution', label: 'Its distribution, including center, spread, and shape' },
      { id: 'causality', label: 'Whether the variable causes another variable' },
      { id: 'row-identity', label: 'The unique identifier of every row' },
      { id: 'category-order', label: 'The preferred order of unrelated categories' },
    ],
    correctChoiceId: 'distribution',
    explanation:
      'A histogram counts observations in numeric intervals, making the distribution’s location, spread, skew, peaks, and possible outliers visible.',
    reference: histogramReference,
  },
  {
    id: 'data-analysis.mcq.scatter-positive',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt:
      'In a scatter plot, points generally rise from left to right. What pattern does this suggest?',
    instruction: 'Choose the direction of the observed association.',
    choices: [
      { id: 'positive', label: 'A positive association' },
      { id: 'negative', label: 'A negative association' },
      { id: 'none', label: 'No association by definition' },
      { id: 'causal', label: 'A proven causal effect' },
    ],
    correctChoiceId: 'positive',
    explanation:
      'An upward pattern suggests that larger values of one variable tend to accompany larger values of the other. It does not by itself prove causation.',
    reference: scatterPlotReference,
  },
  {
    id: 'data-analysis.mcq.sample-bias',
    topicId: 'data-analysis',
    kind: 'multiple-choice',
    prompt: 'A product survey is shown only to customers who renewed. What is the main risk?',
    instruction: 'Choose the limitation created by excluding other customers.',
    choices: [
      {
        id: 'selection',
        label: 'Selection bias: the sample may overrepresent satisfied customers',
      },
      { id: 'rounding', label: 'Rounding error: percentages cannot be calculated' },
      { id: 'sorting', label: 'Sorting error: rows are in the wrong order' },
      { id: 'units', label: 'Unit error: renewal has no measurable definition' },
    ],
    correctChoiceId: 'selection',
    explanation:
      'Renewed customers differ systematically from those who left. Results from only that group may not represent the full customer population.',
    reference: dataQualityReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
