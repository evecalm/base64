var $ = function  (id) {
	return document.getElementById(id)
},
	fileArea = $('file-area'),
	tips = $('tips'),
	tipText = $('tip-text'),
	base64Area = $('base64-area'),
	base64Code = $('base64-code'),
	file = $('file'),
	mask = $('mask'),
	fileInfo = $('file-info'),
	clip = new ZeroClipboard.Client()

clip.glue('copy')

clip.addEventListener( 'mouseDown', function() {
    clip.setText(base64Code.innerText);
});
clip.addEventListener( 'onComplete', function() {
	alert('已成功复制到剪贴板')
});

window.onresize = function(){
	clip.reposition()
}

function nullFun (e) {
	e.stopPropagation()
	e.preventDefault()
}

function dragEnter (e) {
	mask.classList.remove('hide')
	fileArea.classList.add('hover')
	tipText.innerText = 'Just release your mouse'
	e.stopPropagation()
	e.preventDefault()
}

function dragLeave (e) {
	mask.classList.add('hide')
	fileArea.classList.remove('hover')
	tipText.innerText = 'Drag your file to here'
	e.stopPropagation()
	e.preventDefault()
}

function fileSelected (e) {
	var reader = new FileReader(),
		file = (e.dataTransfer && e.dataTransfer.files[0]) || (e.target.files[0]),
		fileProp = [],
		value

	e.preventDefault()
	e.stopPropagation()
	mask.classList.add('hide')
	fileArea.classList.remove('hover')
	tipText.innerText = 'Drag your file to here'
	if(!file) return
	fileProp.push('Name: ' + file['name'])
	fileProp.push('Type: ' + file['type'])
	value = file['size']
	if (value / 1024 > 1) {
		value /= 1024
		if (value / 1024 > 1) {
			value /= 1024
			if (value / 1024 > 1) {
				value /= 1024
				value = value.toFixed(2) + 'G'
				value = '然拖进来一个' + value
					+ '的文件，真是丧心病狂啊！！！你的电脑会废掉的！\n You are really Incredible to drag '
					+ value + ' file, your PC will crash soon!'
				alert(value)
				return
			} else {
				value = value.toFixed(2) + 'Mb'
			}
		} else {
			value = value.toFixed(2) + 'Kb'
		}
	} else {
		value += 'bit'
	}
	fileProp.push('Size: ' + value)
	fileProp = fileProp.join('</li><li>')
	fileProp = '<li>' + fileProp + '</li>'
	fileInfo.innerHTML = fileProp
	reader.onload = loaded
	reader.readAsDataURL(file)
}

fileArea.addEventListener('dragenter',dragEnter,false)
mask.addEventListener('dragover',nullFun,false)
mask.addEventListener('dragleave',dragLeave,false)
mask.addEventListener('drop',fileSelected,false)

file.addEventListener('change',fileSelected,false)

function loaded (e) {
	fileArea.classList.remove('full-width')
	fileArea.classList.add('half-width')
	base64Area.classList.remove('zero-width')
	base64Area.classList.add('half-width')
	base64Code.innerText = e.target.result
	setTimeout(function  () {
		clip.reposition()
	},500)
}