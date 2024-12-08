import { GlobalComponentContextType } from '../types'

type GlobalComponentDisplayName =
  | 'BottomSheet'
  | 'LoadingIndicator'
  | 'Popup'
  | 'ScreenBottomSheet'
  | 'Toast'

class GlobalComponentManager {
  private map = new Map<string, React.RefObject<GlobalComponentContextType<any>>>()

  public registerRef(name: string, ref: React.RefObject<GlobalComponentContextType<any>>): void {
    if (this.map.has(name)) return
    this.map.set(name, ref)
  }

  public async hideAll(): Promise<boolean> {
    await Promise.all(Array.from(this.map).map(([_, popup]) => popup.current?.hide()))
    return true
  }

  public async hide(params: { name: GlobalComponentDisplayName }) {
    const componentRef = this.map.get(params.name)

    if (componentRef) {
      await componentRef.current?.hide()
    }
    return true
  }
}

export const globalComponentManager = new GlobalComponentManager()
