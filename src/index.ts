import { znMessage, rpcClient, autoSize, znHttp } from '@zenginehq/zengine-sdk'
import { ZengineContextData, ZengineRecord } from '@zenginehq/zengine-sdk/lib/zengine.types'

let context: ZengineContextData = null

autoSize()

rpcClient.call({ method: 'context' })
	.then((c: ZengineContextData) => {
		context = c

		actionButton.innerText = 'Let\'s Go!'

		actionButton.addEventListener('click', async e => {
			console.log(context)
			znMessage('So Cool!')

			const { data: { data: record } = {} } = await znHttp({
				url: `/forms/${context.form.id}/records/${context.record.id}`,
				method: 'get'
			})
				.catch(err => ({
					data: {
						data: err instanceof Error
							? err
							: new Error(JSON.stringify(err))
					}
				}))

			if (record instanceof Error) {
				console.error('error:', record)
				return znMessage('Oh No! Check your logs...', 'error')
			}

			console.log('record:', record)
			znMessage('Record fetched...check your console!', 'saved')
		})
	})

const actionButton = document.getElementById('action-button')
