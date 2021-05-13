import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BaseLayout, Button, Card, Link } from '@pancakeswap-libs/uikit'
import { useTotalReferrals, useTotalReferralCommissions } from '../../hooks/useTokenBalance'
import UnlockButton from '../../components/UnlockButton'

const MainContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`
const CardGrid = styled(BaseLayout)`
  grid-gap: 2em;
  & > div {
    grid-column: span 6
  }
`

const Heading = styled.div`
  padding: 24px;
  font-size: 1.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  justify-content: space-between;
`

const Body = styled.div`
  padding: 24px;
`

const Refferals = () => {
  const { account } = useWallet()
  const myTotalReferrals = useTotalReferrals(account);
  const TotalReferrals = myTotalReferrals.toNumber();
  const myTotalReferralCommissions = useTotalReferralCommissions(account);
  const TotalReferralCommissions = myTotalReferralCommissions.toNumber();
  const refferalsLink = "http://moonharvest.net/?ref=".concat(btoa(account))
  const [copyText, setCopyText] = useState("Copy")
  const handleCopy = ()=>{
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refferalsLink);
      setCopyText("Copied");
      setTimeout(function() {
        setCopyText("Copy");
      }, 1000);
    }
  }
  return (
    <MainContainer>
        {!account ?
          (
            <Card style={{ textAlign: 'center', padding: '24px' }}>
              <UnlockButton/>
              <div style={{ marginTop: '1em' }}>
                Unlock wallet to get your unique referral link
              </div>
            </Card>
          )
          : (
            <CardGrid>
              <Card>
                <Heading>
                  Total Referrals
                </Heading>
                <Body>
                  {TotalReferrals}
                </Body>
              </Card>
              <Card>
                <Heading>
                  Total Referral Commissions
                </Heading>
                <Body>
                {TotalReferralCommissions}
                </Body>
              </Card>
              <Card style={{gridColumn: 'span 12'}}>
                <Heading>
                  <div style={{lineHeight: "1.6em"}}>
                    Your Referral Link
                  </div>
                  <Button style={{marginTop: "-0.5em"}} onClick={handleCopy}>
                    {copyText}
                  </Button>
                </Heading>
                <Body>
                  <Link href={refferalsLink} style={{margin: "0 auto"}}>
                    {refferalsLink}
                  </Link>
                </Body>
              </Card>
            </CardGrid>
          )
        }
    </MainContainer>
  )
}
export default Refferals