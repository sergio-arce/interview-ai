
import { makeStyles, Theme } from 'mui-styles'

export const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <p>Tech AInterview © {new Date().getFullYear()}</p>
    </footer>
  )
};

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: 'white',
    background: '#171a4a'
  }
}))