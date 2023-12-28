import { figmaAPI } from './figma-api'

export async function insertSVG(svgString: string) {
  if (!svgString) return

  figmaAPI.run(
    async (figma, { svgString }: { svgString: string }) => {
      const node = figma.createNodeFromSvg(svgString)
      const selectedNode = figma.currentPage.selection[0]

      if (selectedNode) {
        node.x = selectedNode.x + selectedNode.width + 20
        node.y = selectedNode.y
      }

      figma.currentPage.appendChild(node)
      figma.currentPage.selection = [node]
      figma.viewport.scrollAndZoomIntoView([node])
    },
    { svgString },
  )
}
