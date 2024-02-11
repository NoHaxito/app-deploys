import { jsxRenderer } from 'hono/jsx-renderer';

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title}</title>
				{/* <Style /> */}
			</head>
			<body>{children}</body>
		</html>
	);
});
