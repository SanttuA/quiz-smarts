import type { CheatSheetSection } from '../../types'

export const dataAnalysisCheatSheet = [
  {
    id: 'questions-and-data',
    title: 'Questions and data',
    summary: 'Start with a precise question and understand what each value represents.',
    items: [
      {
        term: 'Analysis question',
        detail:
          'State the population, outcome, comparison, and time period before choosing calculations or charts.',
      },
      {
        term: 'Observations and variables',
        detail:
          'A tidy table commonly uses one row per observed unit and one column per measured variable.',
      },
      {
        term: 'Categorical variables',
        detail:
          'Categorical values identify groups or labels. Nominal categories have no inherent order; ordinal categories do.',
      },
      {
        term: 'Quantitative variables',
        detail:
          'Quantitative values represent numeric amounts for which arithmetic differences are meaningful.',
      },
      {
        term: 'Population and sample',
        detail:
          'The population is the full group of interest. A sample is the observed subset used to learn about it.',
      },
      {
        term: 'Units and definitions',
        detail:
          'Record units, category meanings, collection rules, and time zones so values are interpreted consistently.',
      },
    ],
  },
  {
    id: 'quality-and-preparation',
    title: 'Quality and preparation',
    summary: 'Inspect raw data and make every cleaning choice explicit and reproducible.',
    items: [
      {
        term: 'Missing values',
        detail:
          'Measure missingness by variable and group. Do not silently treat missing values as zero.',
      },
      {
        term: 'Duplicate rows',
        detail:
          'Define the key that makes an observation unique before removing duplicates; repeated events can be legitimate.',
      },
      {
        term: 'Validity checks',
        detail:
          'Check allowed categories, plausible ranges, data types, and relationships such as an end date following a start date.',
      },
      {
        term: 'Consistent formats',
        detail:
          'Standardize equivalent labels, date formats, decimal conventions, and units before grouping or comparing.',
      },
      {
        term: 'Outlier review',
        detail:
          'Investigate unusual values. Correct confirmed errors, but retain valid extremes unless the analysis has a documented reason not to.',
      },
      {
        term: 'Audit trail',
        detail:
          'Preserve source data and record transformations so another analyst can reproduce the prepared dataset.',
      },
    ],
  },
  {
    id: 'summaries-and-distributions',
    title: 'Summaries and distributions',
    summary: 'Describe center, spread, shape, and frequency instead of relying on one number.',
    items: [
      {
        term: 'Count and percentage',
        detail:
          'A count gives frequency. A percentage divides a part by the relevant whole and multiplies by 100.',
        code: 'percentage = part / whole × 100',
      },
      {
        term: 'Mean',
        detail:
          'The arithmetic mean is the sum divided by the count. Extreme values can pull it toward a distribution’s tail.',
        code: 'mean = sum(values) / count(values)',
      },
      {
        term: 'Median',
        detail:
          'The median is the middle ordered value, or the mean of the two middle values. It is resistant to extremes.',
      },
      {
        term: 'Range and IQR',
        detail:
          'Range is maximum minus minimum. Interquartile range is Q3 minus Q1 and spans the middle half of the data.',
        code: 'range = max − min\nIQR = Q3 − Q1',
      },
      {
        term: 'Standard deviation',
        detail:
          'Standard deviation expresses typical spread around the mean in the variable’s original units.',
      },
      {
        term: 'Distribution shape',
        detail:
          'Look for symmetry, skew, multiple peaks, gaps, and unusual observations before interpreting a summary statistic.',
      },
    ],
  },
  {
    id: 'charts-and-comparisons',
    title: 'Charts and comparisons',
    summary: 'Match the chart to the variable types and the comparison the reader needs.',
    items: [
      {
        term: 'Bar chart',
        detail:
          'Use separated bars to compare counts, percentages, or other summaries across discrete categories.',
      },
      {
        term: 'Histogram',
        detail:
          'Group one quantitative variable into numeric bins to reveal its center, spread, skew, peaks, and possible outliers.',
      },
      {
        term: 'Line chart',
        detail:
          'Use an ordered time axis to show change over time; consistent intervals make trends easier to interpret.',
      },
      {
        term: 'Box plot',
        detail:
          'Summarize a distribution using its median, quartiles, spread, and flagged extremes, often across several groups.',
      },
      {
        term: 'Honest scales',
        detail:
          'Label axes and units, use consistent scales for comparisons, and avoid visual choices that exaggerate small differences.',
      },
      {
        term: 'Context',
        detail:
          'Give a clear title, define the measure and denominator, identify the time period, and cite the data source.',
      },
    ],
  },
  {
    id: 'relationships-and-groups',
    title: 'Relationships and groups',
    summary: 'Compare like with like and treat association as evidence, not proof of cause.',
    items: [
      {
        term: 'Group summaries',
        detail:
          'Calculate the same measure for each group, while checking group sizes and whether definitions are consistent.',
      },
      {
        term: 'Rates and denominators',
        detail:
          'Use rates when group sizes differ. Always state the denominator and ensure it represents the population at risk.',
      },
      {
        term: 'Percentage points',
        detail:
          'Subtract two percentages for a percentage-point difference. Relative percent change uses the earlier value as its denominator.',
      },
      {
        term: 'Scatter plot',
        detail:
          'Plot paired quantitative values to inspect direction, form, strength, clusters, changing spread, and outliers.',
      },
      {
        term: 'Correlation',
        detail:
          'Correlation summarizes linear association. It can miss nonlinear patterns and be strongly affected by unusual values.',
      },
      {
        term: 'Causation',
        detail:
          'Association alone does not establish cause. Confounding, reverse direction, coincidence, and selection can explain a pattern.',
      },
    ],
  },
  {
    id: 'samples-and-conclusions',
    title: 'Samples and conclusions',
    summary: 'Connect each conclusion to the design, uncertainty, and limits of the evidence.',
    items: [
      {
        term: 'Representative samples',
        detail:
          'A sample should cover the target population without systematically favoring particular members or outcomes.',
      },
      {
        term: 'Sampling variability',
        detail:
          'Different random samples produce different estimates. Larger well-designed samples generally reduce this random variation.',
      },
      {
        term: 'Bias',
        detail:
          'Selection, nonresponse, measurement, coverage, and processing can shift results systematically; sample size alone does not remove bias.',
      },
      {
        term: 'Confidence intervals',
        detail:
          'An interval communicates a range of values compatible with an estimate under a stated method and assumptions.',
      },
      {
        term: 'Practical importance',
        detail:
          'A detectable difference may still be too small to matter. Interpret magnitude in the decision’s real-world context.',
      },
      {
        term: 'Answer with limits',
        detail:
          'Report the direct answer, supporting measure, population and period, uncertainty, important caveats, and next question.',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
