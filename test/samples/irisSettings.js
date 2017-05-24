export default
	{x: {type: 'linear'
		,column: 'Sepal.Length'
		,label: 'Sepal Length'}
	,y: {type: 'linear'
		,column: 'Sepal.Width'
		,label: 'Sepal Width'}
	,marks:
		[
			{type: 'circle'
			,per: ['Sepal.Length', 'Sepal.Width']
			,summarizeY: 'mean'}
		]
	,color_by: 'Species'
	,legend:
		{}};
