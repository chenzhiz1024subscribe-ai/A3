import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');
const repo = 'A3';

const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build'
		}),
		paths: {
			base: dev ? '' : `/${repo}`
		}
	}
};

export default config;