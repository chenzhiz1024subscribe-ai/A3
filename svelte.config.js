import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');
const repo = 'https://github.com/chenzhiz1024subscribe-ai/A3.git';

const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? '' : `/${repo}`
		}
	}
};

export default config;